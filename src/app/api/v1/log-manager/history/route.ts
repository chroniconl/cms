import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

// TODO: Add pagination
export async function GET(request: Request) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v1.log-manager.history.GET',
    httpMethod: 'GET',
  })
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const pageSize = parseInt(url.searchParams.get('pageSize') || '100')

  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  const {
    data: logData,
    error: trendyError,
    count,
  } = await supabase
    .from('__raw_logs')
    .select('*', { count: 'exact' })
    .order('timestamp', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (trendyError) {
    void logger.logDatabaseError(trendyError)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(
    {
      logs: logData,
      count: count as number,
      pageSize: logData.length,
    },
    'Success',
  )
}
