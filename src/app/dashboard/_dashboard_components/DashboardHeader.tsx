import { SearchHeader } from '@/components/header/SearchHeader'
import Avatar from '@/components/Avatar'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import BorderBottom from '@/components/BorderBottom'

const navItems = [
  { label: '/', url: '/dashboard' },
  { label: 'Posts', url: '/dashboard/posts' },
  { label: 'Media', url: '/dashboard/media' },
  { label: 'Log Manager', url: '/dashboard/log-manager' },
  { label: 'Page Builder', url: '/dashboard/page-builder' },
  { label: 'Settings', url: '/dashboard/settings' },
]
export default async function DashboardHeader() {
  return (
    <>
      <div className="px-4">
        <header className="ch-border-outline mx-auto mt-6 hidden h-[80px] w-full max-w-7xl items-center rounded-md bg-card px-4 md:flex">
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-grow gap-2">
              {navItems.map(({ label, url }) => (
                <Link
                  key={label}
                  href={url}
                  className="ch-color-secondary ch-border-secondary-hover rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
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
              {navItems.map(({ label, url }) => (
                <Link
                  key={label}
                  href={url}
                  className="ch-color-secondary ch-border-outline-hover rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
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
