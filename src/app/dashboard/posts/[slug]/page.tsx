export const fetchCache = "force-no-store";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import DeleteDocumentButton from "./_slug_components/DeleteDocumentButton";
import Post from "@/components/general/Post";

export default async function DocumentsSlugPage({
	params,
}: { params: { slug: string } }) {
	if (!params.slug) {
		return <>Error fetching post</>;
	}

	const { data, error } = await supabase
		.from("posts")
		.select("*, category:categories(id, name, slug, color), author:authors(id, display_name, href, avatar_url, twitter_handle)")
		.eq("slug", params.slug)
		.single();

	if (error) {
		return <>Error fetching post</>;
	}

	return (
		<div>
			<div className="flex justify-end gap-2">
				<DeleteDocumentButton id={data.id} />
				<Link
					prefetch={false}
					href={`/dashboard/posts/${data.slug}/edit`}
					className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					Edit
				</Link>
			</div>

			<Post
				title={data.title}
				date={data.publish_date_day}
				slug={data.slug}
				tags={data.tags}
				category={data.category}
				description={data.description}
				content={data.content}
				imageAlt={data.image_alt}
				imageUrl={data.image_url}
				author={data.author as any}
			/>
		</div>
	);
}
