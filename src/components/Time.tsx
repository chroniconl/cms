import { formatDate } from '@/utils/dates'
import type React from 'react'

interface TimeGroupProps {
  children: React.ReactNode
}

interface TimeProps {
  date: string
}

interface TimeTextProps {
  children: React.ReactNode
}

export const TimeGroup = ({ children }: TimeGroupProps) => (
  <div className="flex items-center space-x-1.5 text-base text-stone-700 dark:text-stone-300">
    {children}
  </div>
)

export const Time = ({ date }: TimeProps) => {
  return <time dateTime={date}>{formatDate(date)}</time>
}

export const TimeText = ({ children }: TimeTextProps) => {
  return <span>{children}</span>
}
