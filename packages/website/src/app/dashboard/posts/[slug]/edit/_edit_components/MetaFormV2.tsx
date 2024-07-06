'use client'
import { PlusIcon } from 'lucide-react'
import { Label } from '@chroniconl/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@chroniconl/ui/select'
import { Textarea } from '@chroniconl/ui/textarea'
import { Button } from '@chroniconl/ui/button'
import { Heading } from '@/components/general/heading'
import { Input } from '@chroniconl/ui/input'
import { Card } from '@chroniconl/ui/card'
import { useForm, Controller } from 'react-hook-form'
import { toast } from '@chroniconl/ui/use-toast'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@chroniconl/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@chroniconl/ui/avatar'
import { UploadButton } from '@/components/general/UploadThingys'
import { create } from 'zustand'
import { useEffect } from 'react'
import Image from 'next/image'
type MetaFormProps = {
	id: string
	title: string
	description: string
	author_id?: string
	authors: any[]
}

const avatarState = create<{
	avatarUrl: string | null
	avatarId: string | null
	avatarModalOpen: boolean
	setAvatarUrl: (avatarUrl: string | null) => void
	setAvatarId: (avatarId: string | null) => void
	setAvatarModalOpen: (avatarModalOpen: boolean) => void
}>((set) => ({
	avatarUrl: null,
	avatarId: null,
	avatarModalOpen: false,
	setAvatarUrl: (avatarUrl: string | null) => set({ avatarUrl }),
	setAvatarId: (avatarId: string | null) => set({ avatarId }),
	setAvatarModalOpen: (avatarModalOpen: boolean) => set({ avatarModalOpen }),
}))

const authorState = create<{
	authors: any[]
	setAuthors: (authors: any[]) => void
}>((set) => ({
	authors: [],
	setAuthors: (authors: any[]) => set({ authors }),
}))

export default function MetaForm({
	id,
	title,
	description,
	authors,
	author_id,
}: MetaFormProps) {
	// These stateful avatars are only used when the user is adding a new author
	// that didn't exist in the database
	const avatarUrl = avatarState((state) => state.avatarUrl)
	const avatarId = avatarState((state) => state.avatarId)
	const avatarModalOpen = avatarState((state) => state.avatarModalOpen)
	const setAvatarUrl = avatarState((state) => state.setAvatarUrl)
	const setAvatarId = avatarState((state) => state.setAvatarId)
	const setAvatarModalOpen = avatarState((state) => state.setAvatarModalOpen)

	const state__authors = authorState((state) => state.authors) || authors
	const setAuthors = authorState((state) => state.setAuthors)

	const {
		control,
		handleSubmit,
		setValue: setValueForPostMetadata,
	} = useForm<MetaFormProps>({
		defaultValues: {
			title: title || '',
			description: description || '',
			author_id: author_id || '',
		},
	})

	const onSubmit = async (data: MetaFormProps) => {
		const response = await fetch('/api/v0.1/document/metadata', {
			method: 'PUT',
			body: JSON.stringify({
				id,
				title: data.title,
				description: data.description,
				author_id: data.author_id,
			}),
		})
		const { error, message } = await response.json()

		if (error) {
			toast({
				title: 'Error',
				description: 'Failed to update post metadata',
				variant: 'destructive',
			})
			return
		}

		toast({
			title: 'Success',
			description: 'Post metadata updated successfully',
		})
		// Handle form submission
	}

	const {
		control: authorControl,
		handleSubmit: handleAuthorSubmit,
		reset: resetAuthorForm,
	} = useForm({
		defaultValues: {
			name: '',
			linkTo: '',
		},
	})

	const onAuthorSubmit = async (data: {
		name: string
		linkTo: string
		avatarUrl?: string | null
		avatarId?: string | null
	}) => {
		const response = await fetch('/api/v0.1/authors/create-author', {
			method: 'POST',
			body: JSON.stringify({
				avatar_url: avatarUrl,
				avatar_id: avatarId,
				name: data.name,
				link_to: data.linkTo,
			}),
		})

		const { data: newAuthor, error, message } = await response.json()

		if (error) {
			toast({
				title: 'Error',
				description: 'Failed to create author',
				variant: 'destructive',
			})
			return
		}

		// Add the new author to the authors state
		setAuthors([...state__authors, newAuthor[0]])

		// HEADS UP: This is not the New Author Form
		// This for the Post Metadata Form
		setValueForPostMetadata('author_id', newAuthor[0].id)

		toast({
			title: 'Success',
			description: 'Author created successfully',
		})

		resetAuthorForm() // Reset the author form after submission
		setAvatarModalOpen(false)
		setAvatarUrl(null)
		setAvatarId(null)
	}

	return (
		<Card className="flex flex-col gap-4">
			<div className="px-4 pb-2 pt-6">
				<Heading level={3}>{'Post Metadata'}</Heading>
			</div>
			<form
				className="space-y-[20px] rounded-md px-4 pb-6"
				role="form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col">
					<Label htmlFor="title">Title</Label>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<Input
								type="text"
								id="title"
								placeholder="Enter a title"
								className="w-full"
								{...field}
							/>
						)}
					/>
				</div>

				<div className="flex flex-col">
					<Label htmlFor="description">Description</Label>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<Textarea
								id="description"
								placeholder="Enter a description"
								className="w-full"
								{...field}
							/>
						)}
					/>
				</div>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-10 flex flex-col">
						<div>
							<Label htmlFor="author">Author</Label>
							<Controller
								name="author_id"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										onValueChange={(value) => field.onChange(value)}
									>
										<SelectTrigger className="flex w-full items-center justify-between">
											<SelectValue placeholder="Select an author" />
										</SelectTrigger>
										<SelectContent>
											{state__authors &&
												state__authors.map((author) => (
													<SelectItem key={author.id} value={author.id}>
														{author.display_name}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</div>
					<div className="col-span-2 flex h-full items-end justify-end">
						<Button
							variant="outline"
							onClick={() => setAvatarModalOpen(true)}
							type="button"
						>
							<PlusIcon className="h-5 w-5" />
							<span className="sr-only">Add a new author</span>
						</Button>
					</div>
				</div>

				<div className="flex flex-col">
					<Button type="submit">Update Metadata</Button>
				</div>
			</form>
			<Dialog open={avatarModalOpen} onOpenChange={setAvatarModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add author</DialogTitle>
						<DialogDescription>
							Add an author to your post here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={handleAuthorSubmit(onAuthorSubmit)}
						className="grid gap-4 py-4"
					>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="avatar" className="text-right">
								Avatar
							</Label>
							<div className="flex items-start justify-start gap-6">
								<Avatar>
									<AvatarImage src={avatarUrl || ''} alt="Avatar" />
									<AvatarFallback className="h-full w-full">
										<Image
											src="https://utfs.io/f/d4271cec-49ca-475a-ab84-df354ce7e35a-h5faa7.png"
											alt="Avatar"
											height={50}
											width={50}
										/>
									</AvatarFallback>
								</Avatar>
								<UploadButton
									className="w-fit"
									endpoint="imageUploader"
									onClientUploadComplete={async (res) => {
										if (!res[0].key || !res[0].url) {
											toast({
												title: 'Error',
												description:
													'Failed to upload avatar. Please try again later.',
												variant: 'destructive',
											})
											return
										}

										// This sets the avatar to CLIENT state
										// Not sure how I feel about the success toast here because unless the user submits the form,
										// the avatar will not persist
										setAvatarUrl(res[0].url)
										setAvatarId(res[0].key)

										toast({
											title: 'Success',
											description: 'Author avatar uploaded successfully.',
										})
									}}
									onUploadError={(error: Error) => {
										if (error.message.includes('FileSizeMismatch')) {
											toast({
												title: 'Error',
												description: 'The file size is too large',
												variant: 'destructive',
											})
											return
										}

										toast({
											title: 'Error',
											description:
												'Failed to upload avatar. Please try again later.',
											variant: 'destructive',
										})
									}}
								/>
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Display Name
							</Label>
							<Controller
								name="name"
								control={authorControl}
								render={({ field }) => (
									<Input
										id="name"
										placeholder="Marcus Bub"
										className="col-span-3"
										{...field}
									/>
								)}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="link_to" className="text-right">
								Link to
							</Label>
							<Controller
								name="linkTo"
								control={authorControl}
								render={({ field }) => (
									<Input
										id="link_to"
										placeholder="https://chroniconl.com"
										className="col-span-3"
										{...field}
									/>
								)}
							/>
						</div>
						<DialogFooter>
							<Button type="submit">Add author</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</Card>
	)
}
