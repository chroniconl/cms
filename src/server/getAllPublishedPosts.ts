import { getPSTDate } from '@/utils/dates'
import { removePostsThatWillBePublishedLaterToday } from '@/utils/removePostsThatWillBePublishedLaterToday'
import { supabase } from '@/utils/supabase'
import { format } from 'date-fns'
import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'server.getAllPublishedPosts',
  httpMethod: 'GET',
})

export async function getAllPublishedPosts() {
  const start = performance.now()
  const pstDate = getPSTDate()
  const formattedPSTDate = format(pstDate, 'yyyy-MM-dd')

  const { data, error } = await supabase
    .from('posts')
    .select(
      '*, category:categories(id, name, slug, color), author:authors(id, display_name, href, avatar_url, twitter_handle))',
    )
    .order('publish_date_day', { ascending: false })
    .eq('visibility', 'public')
    .lte('publish_date_day', formattedPSTDate)
    .order('publish_date_day', { ascending: false })

  if (error) {
    void logger.logError({
      message:
        'getAllPublishedPosts failed - Error fetching posts' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    throw Error()
  }

  // Get the filtered posts
  const filteredPosts = removePostsThatWillBePublishedLaterToday(data)

  const end = performance.now()
  void logger.logPerformance({
    message: 'getAllPublishedPosts executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/getAllPublishedPosts',
    http_method: 'GET',
  })

  return filteredPosts
}
