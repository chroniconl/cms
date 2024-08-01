import BlogPostsGroup from '@/components/BlogPostsGroup'
import PublicLayout from '@/components/PublicLayout'
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
    .select('id, name')
    .eq('slug', params.category)
		.single()

  if (categoriesError) {
    throw new Error(categoriesError.message)
  }

  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*, category:categories(id, name, slug, color)')
    .order('publish_date_day', { ascending: false })
    .lte('publish_date_day', formattedPSTDate)
    .eq('visibility', 'public')
    .eq('category_id', categoriesData.id)

  if (postsError) {
    throw new Error(postsError.message)
  }

  // filter out posts based on publish_date_time
  const filteredPosts = removePostsThatWillBePublishedLaterToday(postsData)

  return (
    <PublicLayout>
			<h1 className="text-3xl tracking-tighter sm:text-5xl text-white mb-10">
				{categoriesData?.name}
			</h1>			
      <BlogPostsGroup posts={filteredPosts} />
    </PublicLayout>
  )
}
