import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

const schema = joi.object({
  email: joi.string().required(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)
  if (validationError) {
    void logger.logError({
      message:
        'POST failed - Error validating request data' + validationError.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: requestData.email,
  })

  if (error?.code === '23505') {
    void logger.logError({
      message: 'POST failed - Email already subscribed' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse('Email already subscribed')
  } else if (error) {
    void logger.logError({
      message: 'POST failed - Error subscribing to newsletter' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse('Something went wrong')
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/subscribe-to-newsletter',
    http_method: 'POST',
  })
  return okResponse('You have successfully subscribed to our newsletter.')
}
