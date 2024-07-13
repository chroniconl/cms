import { SearchHeader } from '@/components/header/SearchHeader'
import Avatar from '@/components/Avatar'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@chroniconl/ui/sheet'
import { Menu } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@chroniconl/ui/dropdown-menu"

const navItems = [
	{ label: 'Dashboard', url: '/dashboard' },
	{ label: 'Posts', url: '/dashboard/posts' },
	{ label: 'Media', url: '/dashboard/media' },
	{ label: 'Settings', url: '/dashboard/settings' },
	{ label: 'Docs', url: '/documentation' },
	{ label: 'Website', url: 'https://chroniconl.com' },
	{ label: 'Form Submissions', url: '/dashboard/form-submissions' },
]

export default async function DashboardHeader() {
	return (
		<>
			<header className="hidden h-[80px] w-full items-center px-4 md:flex">
				<div className="flex w-full items-center gap-4">
					<div className="flex flex-grow">
						<Link href="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary text-sm">
							Dashboard
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<span className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary text-sm">
									Content
								</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Link
											href="/dashboard/posts"
											className='text-sm'
										>
											Posts
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link
											href="/dashboard/media"
											className='text-sm'
										>
											Media
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<span className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary text-sm">
									Admin
								</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Link
											href="/dashboard/form-submissions"
											className='text-sm'
										>
											Form Submissions
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link
											href="https://chroniconl.com"
											className='text-sm'
										>
											Live Site
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<Link href="/dashboard/settings" className="text-sm flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary">
							Settings
						</Link>


						{/* {navItems.map(({ label, url }) => (
							<Link
								key={label}
								href={url}
								className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								{label}
							</Link>
						))} */}
					</div>
					<div className="flex flex-grow-0 items-center gap-4">
						<SearchHeader />
						<Avatar />
					</div>
				</div>
			</header>
			<div className="flex h-[80px] w-full items-center px-4 md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<button className="flex h-10 w-10 items-center justify-center rounded-md bg-background p-2 text-stone-500 hover:text-primary">
							<Menu className="h-5 w-5" />
						</button>
					</SheetTrigger>
					<SheetContent side="left" className="w-80">
						<div className="space-y-4">
							<Avatar />
							<SearchHeader />
							<hr className="border-stone-200 pb-8 dark:border-stone-700" />
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
