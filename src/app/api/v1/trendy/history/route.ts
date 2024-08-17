import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

// TODO: Add pagination
export async function GET(request: Request) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v1.trendy.history.GET',
    httpMethod: 'GET',
  })
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  const { data: trendyData, error: trendyError } = await supabase
    .from('chroniconl__trendy__url_history')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (trendyError) {
    void logger.logDatabaseError(trendyError)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(trendyData, 'Success')
}
