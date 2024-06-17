import Link from "next/link";
import { bangers } from "@/app/fonts";
import { AuthButtons } from "@/components/general/header/AuthButtons";
import { supabase } from "@/utils/supabase";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
import { PostCardDefaultSize } from "@/components/general/Post";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Categories } from "@/components/general/Categories";

export default async function BlogPage() {
	const { data, error } = await supabase
		.from("posts")
		.select(`*, category:categories(id, name, slug, color)`)
		.order("created_at", { ascending: false })
		.eq("visibility", "public")
		.lt("publish_date", new Date().toISOString())
		.order("publish_date", { ascending: false })
		.limit(10);

	if (error) {
		console.error(error);
		return <div>Error fetching posts</div>;
	}

	return (
		<div className="grid grid-cols-12 gap-8 px-[20px] lg:px-[40px] my-8">
			<main className="col-span-12 lg:col-span-9">
				<section className="mb-16">
					<div className="col-span-12 md:col-span-6">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mt-16">
							Latest Posts
						</h1>
						<p className="mt-2 text-stone-500 dark:text-stone-400">
							Here you can view all the latest posts from our blog.
						</p>
					</div>
				</section>
				<section className="grid grid-cols-12 gap-4 mb-20">
					{data?.map((doc: any) => (
						<div key={doc.id} className="col-span-4">
							<PostCardDefaultSize
								title={doc.title}
								date={doc.publish_date}
								slug={doc.slug}
								tags={doc.tags}
								category={{ name: doc.category.name, color: doc.category.color }}
								description={doc.description}
								publish_date={doc.publish_date}
							/>
						</div>
					))}
				</section>
			</main>
			<aside className="lg:col-span-3 hidden lg:block">
				<div className="sticky top-8 space-y-4 mb-16">
					<Categories />
					<div className="rounded-md bg-secondary p-4 shadow-md mt-4">
						<h3 className="text-lg font-bold">Search</h3>
						<div className="mt-2">
							<Input
								type="search"
								placeholder="Search articles..."
								className="w-full"
							/>
						</div>
					</div>
					<div className="rounded-md bg-secondary p-4 shadow-md mt-4">
						<h3 className="text-lg font-bold">Featured</h3>
						<div className="mt-4 space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="group">
									<div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-stone-200 shadow-md">
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
					<div className="rounded-md bg-secondary p-4 shadow-md mt-4">
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
