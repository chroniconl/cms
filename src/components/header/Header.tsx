import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Menu } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function Component() {
	return (
		<header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background px-4 shadow-sm">
			<div className="hidden items-center gap-2 md:flex md:px-6">
				<Link
					href="/"
					className="mr-10 flex items-center gap-2"
					prefetch={false}
				>
					<h1 className="ch-heading ch-primary">Chroniconl</h1>
				</Link>
				<Link href="/about" className="ch-body ch-muted pr-4" prefetch={false}>
					About
				</Link>
				<Link href="/contact" className="ch-body ch-muted" prefetch={false}>
					Contact
				</Link>
			</div>

			<div className="flex h-16 w-full items-center justify-between md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Open navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-80">
						<div className="grid gap-2 py-6">
							<Link
								href="/"
								className="flex w-full items-center py-2 text-lg font-semibold"
								prefetch={false}
							>
								Home
							</Link>
							<Link
								href="/about"
								className="flex w-full items-center py-2 text-lg font-semibold"
								prefetch={false}
							>
								About
							</Link>
							<Link
								href="/contact"
								className="flex w-full items-center py-2 text-lg font-semibold"
								prefetch={false}
							>
								Contact
							</Link>
						</div>
					</SheetContent>
				</Sheet>

				<Link href="/" className="flex items-center gap-2" prefetch={false}>
					<Logo className="h-6 w-6" />
					<span className="text-xl font-semibold">Chroniconl</span>
				</Link>
				<div className="h-6 w-6" />
			</div>
		</header>
	)
}
