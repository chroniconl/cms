import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v1.log-manager.stats.GET',
  httpMethod: 'GET',
})

// TODO: Add pagination
export async function GET(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  // 1 hour but in milliseconds
  const duration = 60 * 60 * 1000
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - duration)

  const { data, error } = await supabase
    .from('__raw_logs')
    .select('*', { count: 'exact' })
    .gte('timestamp', oneHourAgo.toISOString())
    .lt('timestamp', now.toISOString())

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(data, 'Success')
}
