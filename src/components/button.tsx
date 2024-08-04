import * as React from 'react'

import { cn } from '@/utils/cn'
import Link from 'next/link'

interface ButtonLinkProps {
	href: string
	className?: string
	size?: 'default' | 'sm' | 'lg' | 'icon'
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
	children: React.ReactNode
}
const LinkAsButton = ({
	className,
	variant,
	size,
	href,
	children,
}: ButtonLinkProps) => {
	return (
		<Link href={href} className={cn({ variant, size, className })}>
			{children}
		</Link>
	)
}
LinkAsButton.displayName = 'LinkAsButton'

export { LinkAsButton }
