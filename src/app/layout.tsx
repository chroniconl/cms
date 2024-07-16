import '@chroniconl/stylist'
import '@/styles/tailwind.css'
import '@/styles/prose.css'
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider'
import { Toaster } from '@chroniconl/ui/toaster'
import { cn } from '@/utils/cn'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Analytics } from '@vercel/analytics/react'
import type React from 'react'
import { Providers } from './providers'
import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: {
    template: '%s - Chroniconl',
    default: 'Chroniconl',
  },
  description: 'Hanging out on the technical side of entrepreneurship.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={cn(
          'bg-[#FFF] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#A2A2A2]',
          GeistSans.className,
        )}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <ReactQueryClientProvider>
            <Providers>
              <div>{children}</div>
              <Analytics />
              <Toaster />
            </Providers>
          </ReactQueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
