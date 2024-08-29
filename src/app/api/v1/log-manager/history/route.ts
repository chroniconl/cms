import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'
import Joi from 'joi'

const schema = Joi.object({
  page: Joi.number().integer().min(1).default(1).optional().allow(null),
  pageSize: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(100)
    .optional()
    .allow(null),
  loggerName: Joi.string().optional().allow(null),
  applicationName: Joi.string().optional().allow(null),
  environment: Joi.string().optional().allow(null),
  errorCode: Joi.string().optional().allow(null),
  logLevel: Joi.string().optional().allow(null),
})

export async function GET(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'API_V1_LOG_MANAGER_HISTORY_GET',
    request: request,
  })

  const url = new URL(request.url)
  const searchParams = Object.fromEntries(url.searchParams.entries())

  // Validate search parameters using Joi
  const { error } = schema.validate(searchParams, {
    abortEarly: false,
  })

  if (error) {
    void logger.logValidationError(error)
    return failResponse('Invalid query parameters')
  }

  const page = parseInt(searchParams.page || '1')
  const pageSize = parseInt(searchParams.pageSize || '100')
  const loggerName = searchParams.loggerName
  const applicationName = searchParams.applicationName
  const environment =
    searchParams.environment || process.env.NODE_ENV || 'development'
  const errorCode = searchParams.errorCode
  const logLevel = searchParams.logLevel

  // const page = parseInt(url.searchParams.get('page') || '1')
  // const pageSize = parseInt(url.searchParams.get('pageSize') || '100')

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  let query = supabase
    .from('__raw_logs')
    .select('*', { count: 'exact' })
    .order('timestamp', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (loggerName) {
    query = query.eq('logger_name', loggerName)
  }

  if (applicationName) {
    query = query.eq('application_name', applicationName)
  }

  if (environment) {
    query = query.eq('environment', environment)
  }

  if (errorCode) {
    query = query.eq('error_code', errorCode)
  }

  if (logLevel) {
    query = query.eq('log_level', logLevel)
  }

  const { data: logData, error: trendyError, count } = await query

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
