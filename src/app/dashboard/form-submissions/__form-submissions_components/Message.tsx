'use client'

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LinkAsButton } from '@/components/button'
import { toast } from '@/components/ui/use-toast'
import { useFormSubmissionsStore } from '../__form-submission_state/form-submissions-state'
import { useEffect } from 'react'

interface MessageProps {
	email: string
	name: string
	message: string
	phone: string
	status: string
	date: string
	id: number
}

export default function Message({
	email,
	name,
	message,
	phone,
	date,
	id,
	status,
}: MessageProps) {
	const formSubmissions = useFormSubmissionsStore(
		(state) => state.formSubmissions,
	)
	const setFormSubmissions = useFormSubmissionsStore(
		(state) => state.setFormSubmissions,
	)

	const handleMarkAsSeen = async () => {
		const response = await fetch('/api/v0.1/form-submission/internal-status', {
			method: 'PUT',
			body: JSON.stringify({
				id: id,
				internal__status: status === 'SEEN' ? 'UNSEEN' : 'SEEN',
			}),
		})

		const { data, error } = await response.json()
		if (error) {
			toast({
				title: 'Error',
				description: 'Failed to mark as seen',
				variant: 'destructive',
			})
			return
		}

		const newFormSubmissions = formSubmissions.map((formSubmission) =>
			formSubmission.id === id
				? { ...formSubmission, status: data }
				: formSubmission,
		)
		setFormSubmissions(newFormSubmissions)

		toast({
			title: 'Success',
			description: `Form submission marked as ${status === 'SEEN' ? 'unseen' : 'seen'}`,
		})
	}
	useEffect(() => {
		// This effect will ensure that the component re-renders when formSubmissions changes
	}, [formSubmissions])
	return (
		<div className="flex w-full flex-col">
			<div className="flex flex-col items-center">
				<div className="mx-auto my-5 flex flex-col items-center justify-center">
					<CardTitle>Customer Support</CardTitle>
					<CardDescription>Manage customer inquiries</CardDescription>
				</div>
				<div className="mb-8 flex gap-2">
					<Button variant="outline" onClick={handleMarkAsSeen}>
						Mark as {status === 'SEEN' ? 'Unseen' : 'Seen'}
					</Button>
					<LinkAsButton href={'mailto:' + email}>Reply</LinkAsButton>
				</div>
			</div>

			<div className="grid gap-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="email" className="text-sm font-medium">
							Email
						</Label>
						<Input id="email" defaultValue={email} disabled />
					</div>
					<div className="space-y-1">
						<Label htmlFor="name" className="text-sm font-medium">
							Name
						</Label>
						<Input id="name" defaultValue={name} disabled />
					</div>
				</div>
				<div className="space-y-1">
					<Label htmlFor="message" className="text-sm font-medium">
						Message
					</Label>
					<Textarea
						id="message"
						rows={4}
						className="font-semibold"
						defaultValue={message}
						disabled
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<Label htmlFor="phone" className="text-sm font-medium">
							Phone
						</Label>
						<Input id="phone" defaultValue={phone} disabled />
					</div>
					<div className="space-y-1">
						<Label htmlFor="date" className="text-sm font-medium">
							Date
						</Label>
						<Input id="date" defaultValue={date} disabled />
					</div>
				</div>
			</div>
		</div>
	)
}
