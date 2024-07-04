'use client'
import { useEffect } from 'react'
import { create } from 'zustand'
import { useForm, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function AuthorsFilterOption() {
	const { control, handleSubmit, watch, setValue, getValues } = useForm()
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col">
				<Label htmlFor="author">Author</Label>
				<Controller
					name="author-filter"
					control={control}
					render={({ field }) => (
						<Select {...field} onValueChange={field.onChange}>
							<SelectTrigger className="flex w-full items-center justify-between">
								<SelectValue placeholder="Select an author" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="none">None</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
			</div>
		</div>
	)
}
