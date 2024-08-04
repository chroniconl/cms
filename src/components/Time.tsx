import { formatDate } from '@/utils/dates'

export const Time = ({
	date,
	className,
}: {
	date: string
	className?: string
}) => {
	return (
		<time dateTime={date} className={className}>
			{formatDate(date)}
		</time>
	)
}
