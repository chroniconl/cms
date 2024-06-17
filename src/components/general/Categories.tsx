import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/utils/supabase";

export async function Categories() {
	// TODO Get Categories with most published posts
	const { data: categories, error: categoriesError } = await supabase
		.from("categories")
		.select("id, name, slug, color")
		.limit(5);

	if (categoriesError) {
		throw Error();
	}

	return (
		<div className="rounded-md bg-secondary p-4 shadow-md">
			<h3 className="text-lg font-bold pb-4">Categories</h3>
			<ul className="space-y-1">
				{categories?.map((category: {
					id: string;
					name: string;
					slug: string;
					color: string;
				}) => (
					<li key={category.id}>
						<Link
							href={`/dashboard/posts/${category.slug}`}
							className="block border border-stone-200 dark:border-stone-700 rounded-md px-3.5 py-2.5 hover:bg-stone-200 dark:hover:bg-stone-700"
							prefetch={false}
						>
							{category.name}
						</Link>
					</li>
				))}
				<li className="mt-2 flex items-center justify-center w-full hover:underline">
					<button className="w-fit py-2.5">
						View all categories
					</button>
				</li>
			</ul>
		</div>
	)
}