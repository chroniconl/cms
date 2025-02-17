import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button, ChButtonPrimary } from '@/components/ui/button'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Menu } from 'lucide-react'
import { cn } from '@/utils/cn'
import { SignedIn } from '@clerk/nextjs'
import BorderBottom from '../BorderBottom'
export default function Header() {
  return (
    <header className="sticky top-0 z-50 mx-auto flex h-24 max-w-7xl items-center justify-between bg-background px-4 shadow-sm">
      <div className="hidden items-center gap-2 md:flex md:px-6">
        <Link
          href="/"
          className="mr-10 flex items-center gap-2"
          prefetch={false}
        >
          <h1 className="ch-heading ch-color-primary">Chroniconl</h1>
        </Link>
        <Link
          href="/about"
          className="ch-color-secondary ch-border-outline-hover rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="/contact"
          className="ch-color-secondary ch-border-outline-hover rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
          prefetch={false}
        >
          Contact
        </Link>
      </div>
      <div className="hidden md:block">
        <SignedIn>
          <Link
            href="/dashboard"
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80',
              'h-10 px-4 py-2',
              'bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-500',
            )}
          >
            Dashboard
          </Link>
        </SignedIn>
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
                className="ch-color-secondary rounded-sm px-4 py-2 hover:bg-stone-900"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="ch-color-secondary rounded-sm px-4 py-2 hover:bg-stone-900"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="ch-color-secondary rounded-sm px-4 py-2 hover:bg-stone-900"
              >
                Contact
              </Link>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80',
                    'h-10 px-4 py-2',
                    'bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-500',
                  )}
                >
                  Dashboard
                </Link>
              </SignedIn>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          <span className="ch-heading ch-color-primary">Chroniconl</span>
        </Link>
        <div className="h-6 w-6" />
      </div>
    </header>
  )
}
