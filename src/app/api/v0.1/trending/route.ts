import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

export async function GET(request: Request) {
  const start = performance.now()
  const url = new URL(request.url)
  const params = url.searchParams

  // Define schema for query parameters
  const schema = joi.object({
    limit: joi.number().integer().min(1).default(10),
    offset: joi.number().integer().min(0).default(0),
  })

  // Validate query parameters
  const { error, value } = schema.validate({
    limit: params.get('limit'),
    offset: params.get('offset'),
  })

  if (error) {
    void logger.logError({
      message: 'GET failed - Error validating request data' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse(error?.details[0]?.message)
  }

  const { limit, offset } = value

  // Fetch data with pagination
  const { data, error: supabaseError } = await supabase
    .from('repo_trends')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
    .range(offset, offset + limit)

  if (supabaseError) {
    void logger.logError({
      message: 'GET failed - Error fetching trends' + supabaseError.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse(supabaseError?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/trending',
    http_method: 'GET',
  })
  return okResponse(data)
}
