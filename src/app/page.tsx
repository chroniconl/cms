import BlogPostsGroup from '@/components/BlogPostsGroup'
import PublicLayout from '@/components/PublicLayout'
import SubscribeToNewsletter from '@/components/SubscribeToNewsletter'
import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'
import Link from 'next/link'

export default async function Page() {
  const posts = await getAllPublishedPosts()
  return (
    <PublicLayout>
      <div className="mb-8 mt-20">
        <div className="max-w-xl">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
            Writings about experiences working with technology
          </h2>
          <p className="mb-8">
            There's always something to be built and there are always something
            learn. Really I don't know what else to say, so I'll leave it there.
          </p>
        </div>
      </div>
      <BlogPostsGroup posts={posts.slice(0, 6)} />
      {/* This id is here to capture the full SubscribeToNewsletter */}
      <div id="subscribe_to_newsletter" />
      <SubscribeToNewsletter />
      <div className="mb-20 md:mb-12 md:mt-20">
        <div className="max-w-xl">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
            So like, what does Chroniconl even do?
          </h2>
          <p className="mb-8">
            To put simply; builds web applications and documents the f*** ups
            along the way.
          </p>
        </div>
      </div>
      <BlogPostsGroup
        posts={posts.slice(6, posts.length - 1)}
        noImage
        enableLazyScroll
      />
    </PublicLayout>
  )
}
