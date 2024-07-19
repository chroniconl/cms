import { getPSTDate } from '@/utils/dates'
import { removePostsThatWillBePublishedLaterToday } from '@/utils/removePostsThatWillBePublishedLaterToday'
import { supabase } from '@/utils/supabase'
import { format } from 'date-fns'

export async function getAllPublishedPosts() {
  const pstDate = getPSTDate()
  const formattedPSTDate = format(pstDate, 'yyyy-MM-dd')

  const { data, error } = await supabase
    .from('posts')
    .select(
      '*, category:categories(id, name, slug, color), author:authors(id, display_name, href, avatar_url, twitter_handle), tags:post_tag_relationship(tag:tags(id, name, slug))',
    )
    .order('publish_date_day', { ascending: false })
    .eq('visibility', 'public')
    .lte('publish_date_day', formattedPSTDate)
    .order('publish_date_day', { ascending: false })
  if (error) {
    throw Error()
  }

  // Get the filtered posts
  const filteredPosts = removePostsThatWillBePublishedLaterToday(data)

  return filteredPosts
}
