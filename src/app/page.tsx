import BlogPostsGroup from '@/components/BlogPostsGroup'
import LatestHowToPosts from '@/components/LatestHowToPosts'
import PublicLayout from '@/components/PublicLayout'
import SubscribeToNewsletter from '@/components/SubscribeToNewsletter'
import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'

export default async function Page() {
	const posts = await getAllPublishedPosts()
	const preferredCategory = 'Tutorials'

	const tutorials = posts.filter(
		(post) => post.category.name === preferredCategory,
	)

	return (
		<PublicLayout>
			<div className="grid w-full grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-6 lg:col-span-9">
					<BlogPostsGroup posts={posts} limit={6} />
				</div>
				<div className="col-span-12 md:col-span-6 lg:col-span-3">
					<LatestHowToPosts label="Latest Tutorials" posts={tutorials} />
					<SubscribeToNewsletter />
				</div>
			</div>
		</PublicLayout>
	)
}
