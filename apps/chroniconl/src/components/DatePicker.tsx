'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { ChButtonPrimary } from '@repo/ui/button'
import { Calendar } from '@repo/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { cn } from '@/utils/cn'
import { isValidDate } from '@/utils/dates'

export function DatePickerSimple({
  date = new Date(),
  setDate = () => {},
  disabled = false,
}: {
  date?: Date
  setDate: (date: Date) => void
  disabled?: boolean
}) {
  const isValid = isValidDate(date)
  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled} className="flex items-center">
        <ChButtonPrimary
          className={cn(
            'w-full justify-start text-left font-normal',
            !isValid || (!date && 'text-muted-foreground'),
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {isValid && date ? format(date, 'PPP') : <span>Pick a date</span>}
        </ChButtonPrimary>
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
