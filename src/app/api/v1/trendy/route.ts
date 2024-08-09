import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v1.trendy.POST'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

const schema = joi.object({
  url: joi.string().required(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logError({
      message: 'POST failed - Error getting user' + JSON.stringify(userError),
      error_code: 'AUTH_ERROR',
    })
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void logger.logError({
      message:
        'POST failed - Error validating request data' + validationError.message,
      error_code: 'VALIDATION_ERROR',
      http_method: 'POST',
    })
    return failResponse(validationError.message)
  }

  const trendyResponse = await fetch(
    process.env.TRENDY_API_URL + '/v1/research/preview?url=' + requestData.url,
  )

  const responseData = await trendyResponse.json()

  if (responseData.error) {
    void logger.logError({
      message: 'POST failed - Error fetching trendy data' + responseData.error,
      error_code: 'TRENDY_ERROR',
      exception_type: 'Error',
    })
    return failResponse("Couldn't fetch data")
  }

  return okResponse(responseData, 'Success')
}
