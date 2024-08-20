import { clsx } from 'clsx'
import { cn } from '@/utils/cn'

interface TextProps {
  className?: string
  children: React.ReactNode
  [key: string]: any
}

export function Text({ className, children, ...props }: TextProps) {
  return (
    <p
      {...props}
      className={cn(className, 'text-sm text-stone-500 dark:text-stone-400')}
    >
      {children}
    </p>
  )
}

export function Code({ className, ...props }: TextProps) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'ch-border-outline rounded-xs leading-2 w-fit select-all bg-stone-800 px-1.5 py-1 text-xs text-stone-300/60',
      )}
    />
  )
}
