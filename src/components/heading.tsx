import { clsx } from 'clsx'

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  children: React.ReactNode
}

export function Heading({ className, level = 2, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(
        className,
        'leading-6 tracking-tight text-stone-950 dark:text-white',
        {
          'text-2xl font-bold': level === 1,
          'text-lg font-semibold sm:text-xl': level === 2,
          'text-base font-semibold sm:text-lg': level === 3,
          'text-base font-medium sm:text-sm': level === 4,
        },
      )}
    />
  )
}
