import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { GithubIcon, TwitterIcon } from './icons'

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-12 md:gap-12 md:px-6">
        <div className="col-span-12 space-y-4 md:col-span-4">
          <div className="flex items-center gap-2">
            <h3 className="ch-heading ch-primary">Chroniconl</h3>
          </div>
          <p className="ch-body ch-muted">
            Hanging out on the technical side of entrepreneurship, application
            development and more.
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-2">
          <h4 className="ch-body ch-primary">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link href="/about" className="ch-body ch-muted hover:underline">
              About
            </Link>
            <Link href="/contact" className="ch-body ch-muted hover:underline">
              Contact
            </Link>
            <Link
              href="/categories"
              className="ch-body ch-muted hover:underline"
            >
              Categories
            </Link>
          </nav>
        </div>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-2">
          <h4 className="ch-body ch-primary">Site</h4>
          <nav className="flex flex-col gap-2">
            <Link
              href="/feed.xml"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              RSS Feed
            </Link>
            <Link
              href="/sitemap.xml"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              Sitemap
            </Link>
            <Link
              href="/robots.txt"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              Robots.txt
            </Link>
          </nav>
        </div>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-2">
          <h4 className="ch-body ch-primary">Community</h4>
          <nav className="flex flex-col gap-2">
            <Link
              href="https://github.com/chroniconl/cms"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              We're open source!
            </Link>
          </nav>
        </div>
        {/* <div className="col-span-12 flex flex-col gap-4 md:col-span-2">
          <h4 className="ch-body ch-primary">Legal</h4>
          <nav className="flex flex-col gap-2">
            <Link
              href="/legal/privacy"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/disclaimer"
              className="ch-body ch-muted hover:underline"
              prefetch={false}
            >
              Disclaimer
            </Link>
          </nav>
        </div> */}
        <div className="col-span-12 flex flex-col gap-4 md:col-span-2">
          <h4 className="ch-body ch-primary">Follow Us</h4>
          <div className="flex gap-x-4">
            <Link
              href="https://x.com/chroniconl_src"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <TwitterIcon className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/matthewbub/chroniconl-cms"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <GithubIcon className="h-6 w-6" />
              <span className="sr-only">Github</span>
            </Link>
            {/* <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
							<LinkedinIcon className="h-6 w-6" />
							<span className="sr-only">LinkedIn</span>
						</Link> */}
          </div>
        </div>
      </div>
      <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
        &copy; 2024 Chroniconl. All rights reserved.
      </div>
    </footer>
  )
}
