import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../utils/cn'

const badgeVariants = cva(
	'inline-flex items-center text-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline: 'text-foreground',
				red: 'border border-red-500 text-red-500 bg-red-50 dark:bg-red-700 dark:text-white',
				blue: 'border border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-700 dark:text-white',
				green:
					'border border-green-500 text-green-500 bg-green-50 dark:bg-green-700 dark:text-white',
				yellow:
					'border border-yellow-500 text-yellow-500 bg-yellow-50 dark:bg-yellow-700 dark:text-white',
				gray: 'border border-stone-500 text-stone-500 bg-stone-50 dark:bg-stone-700 dark:text-white',
				indigo:
					'border border-indigo-500 text-indigo-500 bg-indigo-50 dark:bg-indigo-700 dark:text-white',
				purple:
					'border border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-700 dark:text-white',
				pink: 'border border-pink-500 text-pink-500 bg-pink-50 dark:bg-pink-700 dark:text-white',
				orange:
					'border border-orange-500 text-orange-500 bg-orange-50 dark:bg-orange-700 dark:text-white',
				teal: 'border border-teal-500 text-teal-500 bg-teal-50 dark:bg-teal-700 dark:text-white',
				cyan: 'border border-cyan-500 text-cyan-500 bg-cyan-50 dark:bg-cyan-700 dark:text-white',
				white: 'border border-white text-white bg-white',
				black: 'border border-black text-black bg-black',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	)
}

export { Badge, badgeVariants }
