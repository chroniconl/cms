import Link from "next/link";
import { bangers } from "@/app/fonts";
import { AuthButtons } from "@/components/general/header/AuthButtons";
import { supabase } from "@/utils/supabase";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";

export default async function BlogPage() {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
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
		<>
			<header className="bg-black text-white flex flex-col-reverse md:flex-row md:justify-between gap-5">
				<h1 className={bangers.className}>
					Chroniconl
					<span className={bangers.className}>A CMS without a Head!</span>
				</h1>
				<div className="w-full flex justify-end md:block md:w-fit">
					<AuthButtons />
				</div>
			</header>
			<div className="sticky top-0 flex gap-8 w-full justify-end py-6 pr-5 md:pr-10 bg-[#F5F5DC] shadow-md">
				<Link
					href="/documentation"
					className="text-lg font-semibold hover:underline"
				>
					Documentation
				</Link>
				<Link href="/support" className="text-lg font-semibold hover:underline">
					Support
				</Link>
				<Link href="/pricing" className="text-lg font-semibold hover:underline">
					Pricing
				</Link>
				<Link href="/blog" className="text-lg font-semibold hover:underline">
					Blog
				</Link>
			</div>
			<main>
				<section className="grid grid-cols-12 gap-4 mb-20">
					<div className="col-span-12 md:col-span-6">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-bold mt-16">
							Latest Posts
						</h1>
						<p className="mt-2 text-stone-500 dark:text-stone-400">
							Here you can view all the latest posts from our blog.
						</p>
					</div>					
				</section>
				<section className="grid grid-cols-12 gap-4 mb-20">
					{data?.map((doc: any) => (
						<Link key={doc.id} href={`/blog/${formatTimestampToSlug(doc.publish_date)}/${doc.slug}`} className="col-span-4">
							<div>
								<h2 className="text-2xl font-bold">{doc.title}</h2>
								<p className="text-sm text-stone-500 dark:text-stone-400">
									{doc.created_at}
								</p>
							</div>
							<div>
								<p className="text-lg text-stone-500 dark:text-stone-400">
									{doc.content}
								</p>
							</div>
						</Link>
					))}
				</section>
			</main>
			<footer>
				<div className="footer-links">
					<a href="/">License</a>
					<a href="/">Support</a>
					<a href="/">Developer</a>
				</div>
				<p>© 2023 - 2024 Chroniconl CMS. All rights reserved.</p>
			</footer>
		</>
	);
}
