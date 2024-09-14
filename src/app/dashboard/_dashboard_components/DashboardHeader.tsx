import { SearchHeader } from '@/components/header/SearchHeader'
import Avatar from '@/components/Avatar'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@chroniconl/ui/sheet'
import { Menu } from 'lucide-react'
import BorderBottom from '@/components/BorderBottom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@chroniconl/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const navItems = [
  { label: '/', url: '/dashboard' },
  { label: 'Posts', url: '/dashboard/posts' },
  { label: 'Media', url: '/dashboard/media' },
  { label: 'Page Builder', component: ToolMenu },
  { label: 'Settings', url: '/dashboard/settings' },
]
const tools = [
  { label: 'Open Source', url: '/dashboard/research/open-source' },
  { label: 'Article Group Manager', url: '/dashboard/article-group-manager' },
  { label: 'Log Manager', url: '/dashboard/log-manager' },
  { label: 'Observatory', url: '/dashboard/research/observatory' },
]

export function ToolMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ch-color-secondary ch-border-secondary-hover flex items-center rounded-sm px-4 py-2 text-sm hover:bg-stone-900">
          Tools
          <ChevronDown className="ml-1 h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {tools.map(({ label, url }) => (
          <DropdownMenuItem key={label}>
            <Link href={url} className="w-full">
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default async function DashboardHeader() {
  return (
    <>
      <div className="px-4">
        <header className="ch-border-outline mx-auto mt-6 hidden h-[80px] w-full max-w-7xl items-center rounded-md bg-card px-4 md:flex">
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-grow gap-2">
              {navItems.map(
                ({
                  label,
                  url,
                  component: Component,
                }: {
                  label: string
                  url?: string
                  component?: React.FC
                }) => {
                  if (url) {
                    return (
                      <Link
                        key={label}
                        href={url}
                        className="ch-color-secondary ch-border-secondary-hover rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
                      >
                        {label}
                      </Link>
                    )
                  }

                  return Component ? <Component key={label} /> : null
                },
              )}
            </div>
            <div className="flex flex-grow-0 items-center gap-4">
              <SearchHeader />
              <Avatar />
            </div>
          </div>
        </header>
      </div>
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
              <BorderBottom height={2} borderColor="#FFF" />
            </div>
            <div className="grid gap-2 py-6">
              {navItems.map(({ label, url }) => {
                if (url) {
                  return (
                    <Link
                      key={label}
                      href={url}
                      className="ch-color-secondary ch-border-outline-hover rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
                    >
                      {label}
                    </Link>
                  )
                }

                return null
              })}

              <h2 className="mt-12 pl-4 text-sm font-bold text-white">Tools</h2>
              {/* <BorderBottom height={2} borderColor="#FFF" /> */}
              <div className="grid gap-2 py-6">
                {tools.map(({ label, url }) => {
                  if (url) {
                    return (
                      <Link
                        key={label}
                        href={url}
                        className="ch-color-secondary ch-border-outline-hover rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
                      >
                        {label}
                      </Link>
                    )
                  }

                  return null
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
