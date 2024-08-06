import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

const createAuthorSchema = joi.object({
  name: joi.string().required(),
  link_to: joi.string().required(),
  avatar_url: joi.string().optional().allow(''),
  avatar_id: joi.string().optional().allow(''),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logError({
      message: 'POST failed - Error getting user' + JSON.stringify(userError),
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = createAuthorSchema.validate(requestData)

  if (validationError) {
    void logger.logError({
      message:
        'POST failed - Error validating request data' + validationError.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse(validationError.message)
  }

  const { data, error } = await supabase
    .from('authors')
    .insert({
      display_name: requestData?.name,
      href: requestData?.link_to,
      avatar_url: requestData?.avatar_url,
      avatar_id: requestData?.avatar_id,
      created_by: userData?.id,
    })
    .select()

  if (error) {
    void logger.logError({
      message: 'POST failed - Error creating author' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document/image-metadata',
    http_method: 'POST',
  })
  return okResponse(data, 'Avatar created')
}
