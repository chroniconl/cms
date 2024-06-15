import { supabase } from "@/utils/supabase";
import Link from "next/link";

export default async function Page() {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.order("created_at", { ascending: false })
		.eq("visibility", "public")
		.lt("publish_date", new Date().toISOString())
		.order("publish_date", { ascending: false })
		.limit(6);

	if (error) {
		throw Error();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header className="px-4 lg:px-6 h-14 flex items-center">
				<Link
					href="#"
					className="flex items-center justify-center"
					prefetch={false}
				>
					<CodeIcon className="h-6 w-6" />
					<span className="sr-only">Chroniconl CMS</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link
						href="#"
						className="text-sm font-medium hover:underline underline-offset-4"
						prefetch={false}
					>
						Features
					</Link>
					<Link
						href="#"
						className="text-sm font-medium hover:underline underline-offset-4"
						prefetch={false}
					>
						Testimonials
					</Link>
					<Link
						href="#"
						className="text-sm font-medium hover:underline underline-offset-4"
						prefetch={false}
					>
						Resources
					</Link>
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<img
								src="https://images.unsplash.com/photo-1718049720133-1bd494f6797c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								width="550"
								height="550"
								alt="Hero"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
							/>
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
										Chroniconl CMS: The Open Source Content Management System
									</h1>
									<p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
										Effortlessly manage your content with Chroniconl CMS, a
										powerful and flexible CMS built with Next.js and Supabase.
										Designed for developers and content creators alike.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Link
										href="#"
										className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
										prefetch={false}
									>
										Get Started
									</Link>
									<Link
										href="#"
										className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
										prefetch={false}
									>
										Documentation
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section
					id="features"
					className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
				>
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
									Key Features
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Powerful and Flexible Content Management
								</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
									Chroniconl CMS provides a comprehensive set of features to
									streamline your content creation and management workflow.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
							<div className="flex flex-col items-center space-y-4">
								<FilePenIcon className="h-8 w-8" />
								<h3 className="text-xl font-bold">Content Management</h3>
								<p className="text-center text-gray-500 dark:text-gray-400">
									Easily create, edit, and manage your content with a
									user-friendly interface.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4">
								<UsersIcon className="h-8 w-8" />
								<h3 className="text-xl font-bold">More Content!</h3>
								<p className="text-center text-gray-500 dark:text-gray-400">
									Control user access and permissions with granular roles and
									permissions.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4">
								<PlugIcon className="h-8 w-8" />
								<h3 className="text-xl font-bold">More Management!</h3>
								<p className="text-center text-gray-500 dark:text-gray-400">
									Seamlessly integrate with popular tools and services for
									enhanced functionality.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								From the blog
							</h2>
							<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Yeah, we write too!
							</p>
						</div>
					</div>
				</section>
				<section
					id="resources"
					className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
				>
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Resources
							</h2>
							<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Get started with Chroniconl CMS and explore our resources.
							</p>
						</div>
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<Link
								href="#"
								className="group flex h-full items-center justify-center rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
								prefetch={false}
							>
								<div className="flex flex-col items-center space-y-2">
									<BookIcon className="h-8 w-8" />
									<h3 className="text-lg font-semibold">Documentation</h3>
									<p className="text-center text-gray-500 dark:text-gray-400">
										Learn how to use Chroniconl CMS with our comprehensive
										documentation.
									</p>
								</div>
							</Link>
							<Link
								href="#"
								className="group flex h-full items-center justify-center rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
								prefetch={false}
							>
								<div className="flex flex-col items-center space-y-2">
									<GithubIcon className="h-8 w-8" />
									<h3 className="text-lg font-semibold">GitHub</h3>
									<p className="text-center text-gray-500 dark:text-gray-400">
										Explore the Chroniconl CMS source code and contribute to the
										project.
									</p>
								</div>
							</Link>
							<Link
								href="#"
								className="group flex h-full items-center justify-center rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
								prefetch={false}
							>
								<div className="flex flex-col items-center space-y-2">
									<UsersIcon className="h-8 w-8" />
									<h3 className="text-lg font-semibold">Community</h3>
									<p className="text-center text-gray-500 dark:text-gray-400">
										Join our vibrant community and connect with other users.
									</p>
								</div>
							</Link>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					&copy; 2024 Chroniconl CMS. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link
						href="#"
						className="text-xs hover:underline underline-offset-4"
						prefetch={false}
					>
						Terms of Service
					</Link>
					<Link
						href="#"
						className="text-xs hover:underline underline-offset-4"
						prefetch={false}
					>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}

function BookIcon(props: any) {
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
			<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
		</svg>
	);
}

function CodeIcon(props: any) {
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
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	);
}

function FilePenIcon(props: any) {
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
			<path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
			<path d="M14 2v4a2 2 0 0 0 2 2h4" />
			<path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
		</svg>
	);
}

function GithubIcon(props: any) {
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
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
}

function PlugIcon(props: any) {
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
			<path d="M12 22v-5" />
			<path d="M9 8V2" />
			<path d="M15 8V2" />
			<path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
		</svg>
	);
}

function UsersIcon(props: any) {
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
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	);
}
