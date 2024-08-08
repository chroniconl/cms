/**
 * v0 by Vercel.
 * @see https://v0.dev/t/brZKx9ToDhP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable'
import Link from 'next/link'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  ImageIcon,
  MenuIcon,
  SettingsIcon,
  TelescopeIcon,
} from 'lucide-react'

export default function ResizableSideNavWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} className="sticky top-10 z-10">
        <nav className="sticky top-10 z-10 flex flex-col gap-2 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
          <Collapsible className="grid gap-1">
            <CollapsibleTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-90">
              <div className="flex items-center gap-3">
                <FolderIcon className="h-5 w-5" />
                Posts
              </div>
              <ChevronRightIcon className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="grid gap-1 pl-8">
              <Link
                href="/dashboard/posts"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <FileIcon className="h-5 w-5" />
                Posts
              </Link>
              <Link
                href="/dashboard/media"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <ImageIcon className="h-5 w-5" />
                Media
              </Link>
              <Collapsible className="grid gap-1">
                <CollapsibleTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-90">
                  <div className="flex items-center gap-3">
                    <FolderIcon className="h-5 w-5" />
                    Design
                  </div>
                  <ChevronRightIcon className="h-5 w-5 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="grid gap-1 pl-8">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    <FileIcon className="h-5 w-5" />
                    Wireframes
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    <FileIcon className="h-5 w-5" />
                    Mockups
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
          <Link
            href="/dashboard/explore"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <TelescopeIcon className="h-5 w-5" />
            Explore / Research
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
