import { SearchHeader } from '@/components/general/header/SearchHeader'
import Avatar from '@/components/general/Avatar'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@chroniconl/ui/sheet'
import { Menu } from 'lucide-react'
const navItems = [
	{ label: 'Dashboard', url: '/dashboard' },
	{ label: 'Posts', url: '/dashboard/posts' },
	{ label: 'Media', url: '/dashboard/media' },
	{ label: 'Settings', url: '/dashboard/settings' },
	{ label: 'Docs', url: '/documentation' },
]

export default async function DashboardHeader() {
	return (
		<>
			<header className="hidden md:flex h-[80px] w-full items-center px-4">
				<div className="flex w-full items-center gap-4">
					<div className="flex flex-grow">
						{navItems.map(({ label, url }) => (
							<Link
								key={label}
								href={url}
								className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								{label}
							</Link>
						))}
					</div>
					<div className="flex flex-grow-0 items-center gap-4">
						<SearchHeader />
						<Avatar />
					</div>
				</div>
			</header>
			<div className="md:hidden h-[80px] flex w-full items-center px-4">
				<Sheet>
					<SheetTrigger asChild>
						<button className="flex h-10 w-10 items-center justify-center rounded-md bg-background p-2 text-stone-500 hover:text-primary">
							<Menu className="h-5 w-5" />
						</button>
					</SheetTrigger>
					<SheetContent side="left" className="w-80">
						<div className='space-y-4'>
							<Avatar />
							<SearchHeader />
							<hr className="border-stone-200 dark:border-stone-700 pb-8" />
						</div>
						<div className="grid gap-2 py-6">
							{navItems.map(({ label, url }) => (
								<Link
									key={label}
									href={url}
									className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									{label}
								</Link>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</>
	)
}
