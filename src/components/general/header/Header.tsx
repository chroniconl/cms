"use client"

import React from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {

	return (
		<header className="flex items-center justify-between gap-4 py-6 px-4 md:px-6">
			<Link href="#" className="flex items-center gap-2" prefetch={false}>
				<BookmarkIcon className="h-6 w-6" />
				<span className="font-sans font-bold">Chroniconl</span>
			</Link>
			<nav className="hidden md:flex items-center gap-4">
				<Link href="https://github.com/matthewbub/chroniconl-cms" className="font-sans font-medium hover:underline underline-offset-4" prefetch={false}>
					GitHub
				</Link>
			</nav>
			<div className="md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<MenuIcon className="h-6 w-6" />
					</SheetTrigger>
					<SheetContent className="bg-secondary p-6 rounded-md shadow-lg">
						<SheetHeader>
							<SheetTitle>Chroniconl</SheetTitle>
						</SheetHeader>
						<nav className="flex flex-col items-center gap-4">
							<Link href="https://github.com/matthewbub/chroniconl-cms" className="font-sans font-medium hover:underline underline-offset-4" prefetch={false}>
								GitHub
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}

function BookmarkIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
		</svg>
	)
}

function MenuIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	)
}