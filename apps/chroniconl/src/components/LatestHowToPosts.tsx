import Link from 'next/link'
import { Badge } from '@repo/ui/badge'
import { Heading } from '@/components/heading'
import { ClientImage } from '@/components/image'
import { Text } from '@/components/text'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { Category } from '@/utils/types'
import { formatDate } from '@/utils/dates'

export default async function BlogPostsGroup({
  posts,
}: {
  posts: {
    id: string
    title: string
    description: string
    content: string
    publish_date_day: string
    publish_date_time: string
    slug: string
    image_url: string
    image_alt: string
    category: Category
		author: {
			id: string
			display_name: string
			href: string
			avatar_url: string
			twitter_handle: string
		}
		tags?: {
			id: string
			name: string
			slug: string
		}[]
  }[]
}) {
  return (
		<div>
			<div className="mb-4">
				<Heading level={2}>Latest How-To Posts</Heading>
				<Text>
					Here are the latest how-to posts from the community. If you're looking for a specific post, check out the <Link href="/blog">blog</Link> for more.
				</Text>
			</div>
			<section className="flex flex-col gap-4 divide-y divide-stone-200/50 dark:divide-stone-700/50">
				{posts?.slice(0, 6)?.map((post, i) => (
					<Link
						key={post.id}
						href={`/blog/${formatTimestampToSlug(post.publish_date_day)}/${
							post.slug
						}`}
					>
						<article key={post.id} className="group flex items-center gap-4">
							<div className="mt-4 flex flex-col justify-between">
								<div>
									<p className="ch-text">{post.title}</p>
									<p className="ch-text ch-muted">{post?.author?.display_name && post?.author?.display_name + " · "}{formatDate(post?.publish_date_day)}</p> 									
								</div>
							</div>
						</article>
					</Link>
				))}
			</section>
		</div>
  )
}
