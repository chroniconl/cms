'use client'

import { addDays, format } from 'date-fns'
// import { CalendarIcon } from "@radix-ui/react-icons"
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@chroniconl/ui/button'
import { Calendar } from '@chroniconl/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@chroniconl/ui/popover'
import { cn } from '@/utils/cn'
import { isValidDate } from '@/utils/dates'

export function DatePickerSimple({
	date = new Date(),
	setDate = () => { },
	disabled = false,
}: {
	date?: Date
	setDate: (date: Date) => void
	disabled?: boolean
}) {
	const isValid = isValidDate(date)
	return (
		<Popover>
			<PopoverTrigger asChild disabled={disabled}>
				<Button
					variant={'outline'}
					className={cn(
						'w-[240px] justify-start text-left font-normal',
						!isValid || (!date && 'text-muted-foreground'),
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{isValid && date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					// @ts-ignore
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
