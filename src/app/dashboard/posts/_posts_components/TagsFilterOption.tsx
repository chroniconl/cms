'use client'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTagsStore } from '../_posts_utils/store'

export default function TagsFilterOption({
	data: tagsFromServer,
}: {
	data: {
		id: string
		name: string
		slug: string
	}[]
}) {
	const { control, watch, setValue, getValues } = useForm<{
		tagsFilterAll: boolean
		[x: string]: boolean
	}>({
		defaultValues: {
			['tag-filter-all']: true,
		},
	})
	const tags = useTagsStore((state) => state.tags)
	const setTags = useTagsStore((state) => state.setTags)
	const setTouched = useTagsStore((state) => state.setTouchedTagsCheckAll)
	const touched = useTagsStore((state) => state.touchedTagsCheckAll)

	useEffect(() => {
		if (tagsFromServer) {
			setTags(tagsFromServer)
			setValue('tag-filter-all', true)
		}
	}, [tagsFromServer])

	// Update query whenever the form state changes
	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			// Update query here based on the form values
			const selectedTags = tags.filter((tag) =>
				getValues(`tag-filter-${tag.id}`),
			)
		})
		return () => subscription.unsubscribe()
	}, [watch, tags, getValues])

	// Watch individual checkboxes to determine the state of the "All" checkbox
	const watchTags = watch(
		tags.map((tag) => `tag-filter-${tag.id}`),
	)

	// Determine if "All" checkbox should be checked
	const isAllChecked =
		watchTags.length > 0 &&
		watchTags.every((value) => value === true)

	return (
		<div className="">
			<form>
				<div className="border border-transparent">
					<Label htmlFor="tag-filter">Filter by Tags</Label>
				</div>
				<div className="mt-4 flex flex-col gap-2">
					{tags && tags.length > 0 ? (
						<>
							<div className="flex items-center gap-2 border border-transparent pl-2">
								<Controller
									name="tag-filter-all"
									control={control}
									defaultValue={true}
									render={({ field }) => (
										<Checkbox
											id="tag-filter-all"
											checked={touched ? isAllChecked : true}
											onCheckedChange={(value: boolean) => {
												setTouched(true)
												field.onChange(value)
												tags.forEach((tag: any) => {
													setValue(`tag-filter-${tag.id}`, value)
												})
											}}
										/>
									)}
								/>
								<Label htmlFor="tag-filter-all" className='pb-0'>Select All</Label>
							</div>
							<ScrollArea className="h-72 rounded-md border border-stone-800 bg-stone-800">
								<div className="flex flex-col gap-2 px-2 py-3">
									{tags.map((tag: {
										id: string
										name: string
										slug: string
									}) => (
										<div key={tag.id} className="flex items-center gap-2">
											<Controller
												name={`tag-filter-${tag.id}`}
												control={control}
												defaultValue={true}
												render={({ field }) => (
													<Checkbox
														id={`tag-filter-${tag.id}`}
														checked={field.value}
														onCheckedChange={(value: boolean) => {
															setTouched(true)
															field.onChange(value)
															if (value === false) {
																setValue('tag-filter-all', false)
															}
														}}
													/>
												)}
											/>
											<Label htmlFor={`tag-filter-${tag.id}`} className='pb-0'>
												{tag.name}
											</Label>
										</div>
									))}
								</div>
							</ScrollArea>
						</>
					) : (
						<>
							{/* No tags */}
							<div className="flex items-center gap-2">
								<Checkbox id="tag-filter-none" disabled />
								<Label htmlFor="tag-filter-none" className='pb-0'>None</Label>
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	)
}
