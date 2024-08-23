import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/heading'
import { ClientImage } from '@/components/image'
import { Text } from '@/components/text'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { Category } from '@/utils/types'
import { cn } from '@/utils/cn'

export default async function BlogPostsGroup({
  posts,
  noImage = false,
  // enableLazyScroll = false,
}: {
  limit?: number | undefined
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
  }[]
  noImage?: boolean
  // enableLazyScroll?: boolean
}) {
  return (
    <div>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Link
            className="inline-block h-full"
            key={post.id}
            href={`/blog/${formatTimestampToSlug(post.publish_date_day)}/${
              post.slug
            }`}
          >
            <article
              key={post.id}
              className={cn([
                'group h-full',
                { 'ch-border-outline ch-card rounded-xl p-4': noImage },
              ])}
            >
              {noImage === false && (
                <ClientImage src={post.image_url} alt={post.image_alt} />
              )}
              <div
                className={cn([
                  'flex flex-col justify-between',
                  { 'mt-4': noImage === false },
                ])}
              >
                <div>
                  <Heading level={3}>{post.title}</Heading>
                  <Text className="mt-2">{post?.publish_date_day}</Text>
                  <Text className="mt-2">
                    {post?.description?.slice(0, 200)}
                  </Text>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <Badge variant={post.category?.color}>
                    {post.category?.name}
                  </Badge>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  )
}
