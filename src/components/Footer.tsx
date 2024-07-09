import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { GithubIcon, TwitterIcon } from './icons'

export default function Footer() {
	return (
		<footer className="bg-muted py-12">
			<div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:gap-12 md:px-6">
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Logo className="h-6 w-6" />
						<h3 className="text-2xl font-bold">Chroniconl</h3>
					</div>
					<p className="text-muted-foreground">
						Hanging out on the technical side of entrepreneurship.
					</p>
				</div>
				<div className="grid gap-4">
					<h4 className="text-lg font-medium">Quick Links</h4>
					<nav className="grid gap-2">
						<Link href="/" className="hover:underline" prefetch={false}>
							Home
						</Link>
						<Link href="/about" className="hover:underline" prefetch={false}>
							About
						</Link>
						<Link href="/contact" className="hover:underline" prefetch={false}>
							Contact
						</Link>
					</nav>
				</div>
				<div className="grid gap-4">
					<h4 className="text-lg font-medium">Follow Us</h4>
					<div className="flex gap-4">
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
