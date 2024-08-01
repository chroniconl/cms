import Link from 'next/link'
import { Heading } from '@/components/heading'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { Category } from '@/utils/types'
import { formatDate } from '@/utils/dates'
import BorderBottom from '@/components/BorderBottom'

export default async function BlogPostsGroup({
  label,
  posts,
}: {
  label?: string
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
}) {
  return (
    <div>
      <div className="mb-4">
        {label && <Heading level={2}>{label}</Heading>}
        <div className="mb-4 mt-4">
          <BorderBottom height={1} borderColor="#FFF" />
        </div>
      </div>
      <section className="flex flex-col divide-y divide-stone-200/50 dark:divide-stone-700/50">
        {posts?.slice(0, 6)?.map((post, i) => (
          <Link
            className="group px-2 pb-4 hover:bg-stone-200 dark:hover:bg-stone-800"
            key={post.id}
            href={`/blog/${formatTimestampToSlug(post.publish_date_day)}/${
              post.slug
            }`}
          >
            <article key={post.id} className="group flex items-center gap-4">
              <div className="mt-4 flex flex-col justify-between">
                <div>
                  <p className="ch-body">{post.title}</p>
                  {/* <p className="ch-body ch-muted">{post?.author?.display_name && post?.author?.display_name + " · "}{formatDate(post?.publish_date_day)}</p> 									 */}
                  {/* Theres only 1 author for now, dont need to show the author name */}
                  <p className="ch-body ch-muted">
                    {formatDate(post?.publish_date_day)}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  )
}
