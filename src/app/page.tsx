import { Categories } from "@/components/general/Categories";
import { Time } from "@/components/general/Time";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

export default async function Page() {
	const { data, error } = await supabase
		.from("posts")
		.select("*, category:categories(id, name, slug, color)")
		.order("created_at", { ascending: false })
		.eq("visibility", "public")
		.lt("publish_date", new Date().toISOString())
		.order("publish_date", { ascending: false })
		.limit(6);

	if (error) {
		throw Error();
	}

	return (
		<div className="grid grid-cols-12 gap-8 px-[20px] lg:px-[40px] my-8">
			<main className="col-span-12 lg:col-span-9">
				<section className="mb-16">
					<article className="group bg-secondary p-6 shadow-md rounded-lg">
						<div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-md">
							<img
								src="https://plus.unsplash.com/premium_photo-1718198501646-a95f049e39b5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="Featured Article"
								width={1920}
								height={1080}
								className="object-cover object-center group-hover:opacity-75"
							/>
						</div>
						<div className="mt-4 flex flex-col justify-between group-hover:opacity-75">
							<div>
								<Heading className="text-lg font-bold text-stone-900">
									<Link href="#" prefetch={false}>
										New AI Breakthrough Revolutionizes Image Recognition
									</Link>
								</Heading>
								<Text className="mt-2 text-sm text-stone-500 line-clamp-3">
									Researchers at XYZ University have developed a groundbreaking
									AI model that can recognize objects and scenes with
									unprecedented accuracy...
								</Text>
							</div>
							<div className="mt-3 flex items-center text-sm">
								<Time date="2023-04-19" />
								<Badge className="mx-1 rounded-full bg-stone-200 px-2 py-1 text-xs font-semibold text-stone-800">
									Technology
								</Badge>
							</div>
						</div>
					</article>
				</section>
				<section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{data?.map((post, i) => (
						<Link
							key={post.id}
							href={`/blog/${formatTimestampToSlug(post.publish_date)}/${
								post.slug
							}`}
						>
							<article key={post.id} className="group">
								<div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-stone-100 shadow-md">
									<img
										src="https://plus.unsplash.com/premium_photo-1718198501646-a95f049e39b5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
										alt="Article Thumbnail"
										width={640}
										height={360}
										className="object-cover object-center group-hover:opacity-75"
									/>
								</div>
								<div className="mt-4 flex flex-col justify-between">
									<div>
										<Heading className="text-base font-bold text-stone-900">
											{post.title}
										</Heading>
										<Text
											className="mt-2 text-sm text-stone-500 line-clamp-2"
											small
										>
											{post?.description.slice(0, 200)}
										</Text>
									</div>
									<div className="mt-3 flex items-center text-sm">
										<Badge color={post.category.color}>
											{post.category.name}
										</Badge>
									</div>
								</div>
							</article>
						</Link>
					))}
				</section>
			</main>
			<aside className="lg:col-span-3 hidden lg:block">
				<div className="sticky top-8 space-y-4 mb-16">
					<Categories />
					<div className="rounded-lg bg-secondary p-4 shadow-md mt-4">
						<h3 className="text-lg font-bold">Search</h3>
						<div className="mt-2">
							<Input
								type="search"
								placeholder="Search articles..."
								className="w-full"
							/>
						</div>
					</div>
					<div className="rounded-lg bg-secondary p-4 shadow-md mt-4">
						<h3 className="text-lg font-bold">Featured</h3>
						<div className="mt-4 space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="group">
									<div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-stone-200 shadow-md">
										<img
											src="/placeholder.svg"
											alt="Featured Article Thumbnail"
											width={320}
											height={180}
											className="object-cover object-center group-hover:opacity-75"
										/>
									</div>
									<div className="mt-2">
										<Heading level={4} className="text-sm font-bold">
											<Link href="#" prefetch={false}>
												New Study Shows Benefits of Exercise for Mental Health
											</Link>
										</Heading>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="rounded-lg bg-secondary p-4 shadow-md mt-4">
						<Heading className="text-lg font-bold">Newsletter</Heading>
						<Text className="mt-2" small>
							Subscribe to our newsletter to receive the latest news and
							updates.
						</Text>
						<div className="mt-4">
							<Input
								type="email-address"
								placeholder="Enter your email"
								className="w-full"
							/>
							<Button className="mt-2 w-full">Subscribe</Button>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
}
