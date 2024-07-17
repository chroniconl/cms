import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'ch-button',
        destructive:
          'bg-red-600 text-white font-bold hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        outline:
          'border ch-border bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'ch-button-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        // @ts-ignore
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

const ChButtonPrimary = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn('ch-button', className)} {...props} />
))
ChButtonPrimary.displayName = 'ChButtonPrimary'

const ChButtonSecondary = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn('ch-button-secondary', className)}
    {...props}
  />
))
ChButtonSecondary.displayName = 'ChButtonSecondary'

const ChButtonPrimaryMarketing = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn('ch-button-marketing', className)}
    {...props}
  />
))
ChButtonPrimaryMarketing.displayName = 'ChButtonPrimaryMarketing'

const ChButtonSecondaryMarketing = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn('ch-button-secondary-marketing', className)}
    {...props}
  />
))
ChButtonSecondaryMarketing.displayName = 'ChButtonSecondaryMarketing'

const ChButtonPrimaryOutline = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn('ch-button-outline', className)} {...props} />
))
ChButtonPrimaryOutline.displayName = 'ChButtonPrimaryOutline'

export {
  Button,
  buttonVariants,
  ChButtonPrimary,
  ChButtonSecondary,
  ChButtonPrimaryMarketing,
  ChButtonSecondaryMarketing,
  ChButtonPrimaryOutline,
}
