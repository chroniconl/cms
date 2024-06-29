import BlogPostsGroup from '@/components/general/BlogPostsGroup'
import PublicLayout from '@/components/general/PublicLayout'
import { getPSTDate } from '@/utils/dates'
import { removePostsThatWillBePublishedLaterToday } from '@/utils/removePostsThatWillBePublishedLaterToday'
import { supabase } from '@/utils/supabase'
import { format } from 'date-fns'

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const pstDate = getPSTDate()
  const formattedPSTDate = format(pstDate, 'yyyy-MM-dd')

  const { data: categoriesData, error: categoriesError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', params.category)

  if (categoriesError) {
    throw new Error(categoriesError.message)
  }

  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*, category:categories(id, name, slug, color)')
    .order('publish_date_day', { ascending: false })
    .lte('publish_date_day', formattedPSTDate)
    .eq('visibility', 'public')
    .eq('category_id', categoriesData[0].id)

  if (postsError) {
    throw new Error(postsError.message)
  }

  // filter out posts based on publish_date_time
  const filteredPosts = removePostsThatWillBePublishedLaterToday(postsData)

  return (
    <PublicLayout>
      <BlogPostsGroup posts={filteredPosts} />
    </PublicLayout>
  )
}
