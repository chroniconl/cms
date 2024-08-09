'use client'

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
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function ResizableSideNavWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} className="sticky top-10 z-10">
        <nav className="z-10 flex flex-col divide-y divide-stone-200/50 dark:divide-stone-700/50">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            Home
          </Link>
          <Collapsible className="grid divide-y divide-stone-200/50 dark:divide-stone-700/50  dark:border-l-stone-700/50">
            <CollapsibleTrigger
              className={
                '[&[data-state=open]:bg-accent] text-accent-foreground] flex items-center justify-between px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-90'
              }
            >
              <div className="flex items-center gap-3">Blog Manager</div>
              <ChevronRightIcon className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="grid divide-y divide-stone-200/50 dark:divide-stone-700/50">
              <Link
                href="/dashboard/posts"
                className="ml-4 flex items-center gap-3 border-l border-l-stone-200/50 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground dark:border-l-stone-700/50"
                prefetch={false}
              >
                Blog Posts
              </Link>
              <Link
                href="/dashboard/media"
                className="ml-4 flex items-center gap-3 border-l border-l-stone-200/50 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground dark:border-l-stone-700/50"
                prefetch={false}
              >
                Media Gallery
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="grid divide-y divide-stone-200/50 dark:divide-stone-700/50  dark:border-l-stone-700/50">
            <CollapsibleTrigger
              className={
                '[&[data-state=open]:bg-accent] text-accent-foreground] flex items-center justify-between px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-90'
              }
            >
              <div className="flex items-center gap-3">Explore / Research</div>
              <ChevronRightIcon className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="grid divide-y divide-stone-200/50 dark:divide-stone-700/50">
              <Link
                href="/dashboard/research/open-source"
                className="ml-4 flex items-center gap-3 border-l border-l-stone-200/50 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground dark:border-l-stone-700/50"
                prefetch={false}
              >
                Open Source Projects
              </Link>
              <Link
                href="/dashboard/research/observatory"
                className="ml-4 flex items-center gap-3 border-l border-l-stone-200/50 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground dark:border-l-stone-700/50"
                prefetch={false}
              >
                Observatory (Preview)
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="grid divide-y divide-stone-200/50 dark:divide-stone-700/50  dark:border-l-stone-700/50">
            <CollapsibleTrigger
              className={
                '[&[data-state=open]:bg-accent] text-accent-foreground] flex items-center justify-between px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-90'
              }
            >
              <div className="flex items-center gap-3">Administrator</div>
              <ChevronRightIcon className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="grid divide-y divide-stone-200/50 dark:divide-stone-700/50">
              <Link
                href="/dashboard/form-submissions"
                className="ml-4 flex items-center gap-3 border-l border-l-stone-200/50 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground dark:border-l-stone-700/50"
                prefetch={false}
              >
                Contact Us Form Submissions
              </Link>
            </CollapsibleContent>
          </Collapsible>
          {/* <Link
            href="/dashboard/explore"
            className="flex items-center gap-3 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            Explore / Research
          </Link> */}
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
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
