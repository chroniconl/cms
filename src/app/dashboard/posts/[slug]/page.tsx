export const fetchCache = 'force-no-store'
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import TipTap from "@/components/general/TipTap";
import DeleteDocumentButton from "./_slug_components/DeleteDocumentButton";

export default async function DocumentsSlugPage({ params }: { params: { slug: string; } }) {
	if (!params.slug) {
		return (
			<>Error fetching post</>
		)
	}

	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("slug", params.slug)
		.single();

	if (error) {
		return (
			<>Error fetching post</>
		)
	}

	return (
		<>
			<div className="flex justify-end gap-2">
				<DeleteDocumentButton id={data.id} />
				<Link
					href={`/dashboard/posts/${data.slug}/edit`}
					className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-black dark:text-white"
				>
					{"Edit"}
				</Link>
			</div>
			<div className="mt-10 md:mx-4">
				<div className="mb-20 pb-10 border-b border-accent">
					<h1 className="md:px-4 text-4xl font-bold text-black dark:text-white">{data.title}</h1>
					<div className="prose dark:prose-invert max-w-3xl">
						<TipTap 
							defaultValue={data.content} 
							editable={false} 
							className="prose dark:prose-invert prose-li:py-1 prose:w-full prose-p:0.5 prose-stone"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
