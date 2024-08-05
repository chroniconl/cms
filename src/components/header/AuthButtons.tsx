import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export function AuthButtons() {
  return (
    <nav className="flex items-center gap-12">
      <SignedIn>
        <Link
          href="/dashboard"
          className="flex h-11 items-center rounded-md bg-[#CC0000] px-8 text-lg font-bold text-white"
        >
          My Dashboard
        </Link>
      </SignedIn>
      <SignedOut>
        <Link
          href="/sign-in"
          className="flex h-11 items-center rounded-md bg-[#CC0000] px-8 text-lg font-bold text-white"
        >
          Sign In
        </Link>
      </SignedOut>
    </nav>
  )
}
