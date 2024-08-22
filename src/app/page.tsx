import BlogPostsGroup from '@/components/BlogPostsGroup'
import PublicLayout from '@/components/PublicLayout'
import SubscribeToNewsletter from '@/components/SubscribeToNewsletter'
import { getAllPostCategories } from '@/server/getAllPostCategories'
import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'

export default async function Page() {
  const posts = await getAllPublishedPosts()
  const categories = await getAllPostCategories()
  return (
    <PublicLayout>
      <BlogPostsGroup categories={categories} posts={posts} limit={6} />
      <SubscribeToNewsletter />
    </PublicLayout>
  )
}
