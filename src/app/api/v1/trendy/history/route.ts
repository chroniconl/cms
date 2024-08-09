import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v1.trendy.history.GET'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// TODO: Add pagination
export async function GET(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logError({
      message: 'POST failed - Error getting user' + JSON.stringify(userError),
      error_code: 'AUTH_ERROR',
    })
    return failResponse('Trouble getting user')
  }

  const { data: trendyData, error: trendyError } = await supabase
    .from('chroniconl__trendy__url_history')
    .select('*', { count: 'exact' })

  if (trendyError) {
    void logger.logError({
      message: 'GET failed - Error fetching trendy data' + trendyError.message,
      error_code: 'DATABASE_ERROR',
      exception_type: 'Error',
    })
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v1/trendy/history',
    http_method: 'GET',
  })
  return okResponse(trendyData, 'Success')
}
