import BlogPostsGroup from '@/components/BlogPostsGroup'
import LatestHowToPosts from '@/components/LatestHowToPosts'
import { ObservatoryAsAFeature } from '@/components/marketing/ObservatoryAsAFeature'
import PublicLayout from '@/components/PublicLayout'
import SubscribeToNewsletter from '@/components/SubscribeToNewsletter'
import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'

export default async function Page() {
  const posts = await getAllPublishedPosts()

  return (
    <PublicLayout>
      <ObservatoryAsAFeature />
      <BlogPostsGroup posts={posts} limit={6} />
      <SubscribeToNewsletter />
    </PublicLayout>
  )
}
