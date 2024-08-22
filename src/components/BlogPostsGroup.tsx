import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/heading'
import { ClientImage } from '@/components/image'
import { Text } from '@/components/text'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { Category } from '@/utils/types'

export default async function BlogPostsGroup({
  posts,
  limit,
  categories = [],
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
  categories?: {
    id: string
    name: string
    color: string
    slug: string
  }[]
}) {
  const postsCollection = limit ? posts?.slice(0, limit) : posts
  return (
    <div className="mt-20">
      <div className="mb-8 grid grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
            Writings about experiences working with technology
          </h2>
          <p className="mb-8">
            There's always something to be built and there are always something
            learn. I should probably say more, but I'd rather say less.
          </p>
        </div>

        <div className="col-span-12 flex flex-wrap gap-2 py-4">
          {categories &&
            categories.length > 1 &&
            categories.map((cat) => (
              <Badge
                // @ts-ignore
                variant={cat.color}
                size="lg"
                className="my-0.5"
                key={cat.id}
              >
                {cat.name}
              </Badge>
            ))}
        </div>
      </div>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {postsCollection?.map((post, i) => (
          <Link
            className="inline-block h-full"
            key={post.id}
            href={`/blog/${formatTimestampToSlug(post.publish_date_day)}/${
              post.slug
            }`}
          >
            <article key={post.id} className="group h-full">
              <ClientImage src={post.image_url} alt={post.image_alt} />
              <div className="mt-4 flex flex-col justify-between">
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
