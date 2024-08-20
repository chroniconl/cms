import BlogPostsGroup from '@/components/BlogPostsGroup'
import PublicLayout from '@/components/PublicLayout'
import SubscribeToNewsletter from '@/components/SubscribeToNewsletter'
import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'

export default async function Page() {
  const posts = await getAllPublishedPosts()

  return (
    <PublicLayout>
      <BlogPostsGroup posts={posts} limit={6} />
      <SubscribeToNewsletter />
    </PublicLayout>
  )
}
