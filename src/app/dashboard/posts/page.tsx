import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import NewDocumentButton from "./_posts_components/NewDocumentButton";
import CategoryFilterOptionOnServer from "./_posts_components/CategoryFilterOption.server";
import { getPostsAction } from "./_posts_utils/getPostsAction";
import PostsList from "./_posts_components/PostsList";

export default async function PostsPage() {
	const data = await getPostsAction();

	return (
		<>
			<section className="grid grid-cols-12 gap-4 mb-20">
				<div className="col-span-12 md:col-span-6">
					<Heading>Posts</Heading>
					<Text>Here you can view all the posts you have created and manage their settings.</Text>
				</div>
				<div className="col-span-12 md:col-span-6 flex justify-end gap-2">
					<NewDocumentButton url="chroniconl.com" />
				</div>
			</section>
			<main className="grid grid-cols-12 gap-12">
				<section className="col-span-4">
					<CategoryFilterOptionOnServer />
				</section>
				<section className="col-span-8">
					<PostsList data={data} />
				</section>
			</main>
		</>
	);
}
