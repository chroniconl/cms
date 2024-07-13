import { clsx } from 'clsx'
import { cn } from '@/utils/cn'

interface TextProps {
	className?: string
	children: React.ReactNode
	[key: string]: any
}

export function Text({
	className,
	children,
	...props
}: TextProps) {
	return (
		<p {...props} className={cn(className, 'text-stone-500 dark:text-stone-400 text-sm')}>
			{children}
		</p>
	)
}

export function Code({
	className,
	...props
}: TextProps) {
	return (
		<code
			{...props}
			className={clsx(
				className,
				'rounded border border-stone-950/10 bg-stone-950/[2.5%] px-0.5 text-xs text-stone-950 dark:border-white/20 dark:bg-white/5 dark:text-white',
			)}
		/>
	)
}
