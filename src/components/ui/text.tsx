import { clsx } from 'clsx'
import { firaSansCondensed } from "@/app/fonts";

export function Text({ className, ...props }: {
	className?: string
	children: React.ReactNode
}) {
  return (
    <p
      data-slot="text"
      {...props}
      className={clsx(
				className, 
				'text-base md:text-lg text-stone-500 dark:text-stone-400',
				firaSansCondensed.className
			)}
    />
  )
}

export function Code({ className, ...props }: {
	className?: string
	children: React.ReactNode
}) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'rounded border border-stone-950/10 bg-stone-950/[2.5%] px-0.5 text-sm font-medium text-stone-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white'
      )}
    />
  )
}
