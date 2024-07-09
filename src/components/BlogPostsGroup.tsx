import Link from 'next/link'
import { Badge } from '@chroniconl/ui/badge'
import { Heading } from '@/components/heading'
import { ClientImage } from '@/components/image'
import { Text } from '@/components/text'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { Category } from '@/utils/types'

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
  }[]
}) {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post, i) => (
        <Link
          key={post.id}
          href={`/blog/${formatTimestampToSlug(post.publish_date_day)}/${
            post.slug
          }`}
        >
          <article key={post.id} className="group">
            <ClientImage src={post.image_url} alt={post.image_alt} />
            <div className="mt-4 flex flex-col justify-between">
              <div>
                <Heading level={3}>{post.title}</Heading>
                <Text className="mt-2" small>
                  {post?.publish_date_day}
                </Text>
                <Text className="mt-2" small>
                  {post?.description?.slice(0, 200)}
                </Text>
              </div>
              <div className="mt-3 flex items-center text-sm">
                <Badge color={post.category?.color}>
                  {post.category?.name}
                </Badge>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </section>
  )
}
