"use client";
import PostCard from "./PostCard";
import { getPostsAction } from "../_posts_utils/getPostsAction";
import { Button } from "@/components/ui/button";

export default function PostsList({data}: {data: any}) {
	if (!data) {
		return null;
	}

	// console.log(data);
	const handleLoadMore = async () => {
		const newData = await getPostsAction(0,10);
		// setData([...data, ...newData]);
	}

	return (
		<div>
			<div className="grid gap-5">
				{/* @ts-ignore */}
				{data && data?.data?.map((doc: any) => (
					<PostCard
						key={doc.id}
						title={doc.title}
						date={doc.created_at}
						slug={`/dashboard/posts/${doc.slug}`}
						tags={doc.tags}
						category={doc.category}
						imageAlt={doc.image_alt}
						imageUrl={doc.image_url}
						description={doc.description}						
						publishDate={doc.publish_date}
					/>
				))}
			</div>

			<div className="mt-6 mb-12">
				<Button onClick={handleLoadMore}>Load More</Button>
			</div>
		</div>
	);
}