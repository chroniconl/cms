import Link from "next/link";
import { bangers } from "@/app/fonts";
import { AuthButtons } from "@/components/general/header/AuthButtons";
import { supabase } from "@/utils/supabase";
import TipTap from "@/components/general/TipTap";
import Post from "@/components/general/Post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Categories } from "@/components/general/Categories";
import { handleSubscribeToNewsletterFormSubmit } from "@/server/subscribeToNewsLetter";

export default async function BlogPage({
	params,
}: {
	params: {
		yy: string;
		mm: string;
		dd: string;
		slug: string;
	};
}) {

	const { yy, mm, dd, slug } = params;

	// Create the start and end date for the specific day
	const startDate = new Date(`${yy}-${mm}-${dd}T00:00:00Z`);
	const endDate = new Date(`${yy}-${mm}-${dd}T23:59:59Z`);

	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("visibility", "public")
		.eq("slug", slug)
		.gte("publish_date", startDate.toISOString())
		.lte("publish_date", endDate.toISOString())
		.single();

	if (error) {
		console.error(error);
		return <div>Error fetching post</div>;
	}

	return (
		<div className="grid grid-cols-12 gap-8 px-[20px] lg:px-[40px] my-8">
			<main className="col-span-12 lg:col-span-9">

				<Post
					title={data?.title}
					date={data?.publish_date}
					slug={data?.slug}
					tags={data?.tags}
					category={data?.category}
					description={data?.description}
					content={data?.content}
				/>
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
					<form className="rounded-md bg-secondary p-4 shadow-md mt-4" action={handleSubscribeToNewsletterFormSubmit}>
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
							<Button className="mt-2 w-full" type="submit">Subscribe</Button>
						</div>
					</form>
				</div>
			</aside>
		</div>
	);
}
