import { getPSTDate } from '@/utils/dates'
import { removePostsThatWillBePublishedLaterToday } from '@/utils/removePostsThatWillBePublishedLaterToday'
import { supabase } from '@/utils/supabase'
import { format } from 'date-fns'
import Logger from '@/utils/logger'
import { getCurrentUser } from './getCurrentUser'

const logger = new Logger({
  name: 'server.getAllPublishedPosts',
  httpMethod: 'GET',
})

export async function getAllArticleGroups() {
  const start = performance.now()
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError || userData === null) {
    void logger.logAuthError(userError)
    throw new Error('Error fetching user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const { data, error } = await supabase
    .from('article_group_manager')
    .select('*')

  if (error) {
    throw Error()
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    http_method: 'GET',
  })

  return data
}
