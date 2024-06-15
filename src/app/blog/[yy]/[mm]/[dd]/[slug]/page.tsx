import Link from "next/link";
import { bangers } from "@/app/fonts";
import { AuthButtons } from "@/components/general/header/AuthButtons";
import { supabase } from "@/utils/supabase";
import TipTap from "@/components/general/TipTap";

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
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mt-16">
							{data?.title}
						</h1>
 						<TipTap defaultValue={data?.content} editable={false} />
					</div>					
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
