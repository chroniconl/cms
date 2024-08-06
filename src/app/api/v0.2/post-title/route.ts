import { supabase } from '@/utils/supabase'
import { failResponse, okResponse } from '@/utils/response'
import Logger from '@/utils/logger'
import Joi from 'joi'

const logger = new Logger(
  'api.v0.2.post',
  'chroniconl',
  process.env.NODE_ENV || 'development',
)

const schema = Joi.object({
  postId: Joi.string().required(),
  title: Joi.string().required(),
})

export async function PUT(request: Request) {
  const start = performance.now()
  const data = await request.json()

  const { error: validationError } = schema.validate(data)
  if (validationError) {
    void logger.logError({
      message:
        'PUT failed - Error validating request data' + validationError.message,
      error_code: 'VALIDATION_ERROR',
      http_method: 'PUT',
      session_id: request.headers.get('x-clerk-session-id') || '',
      user_id: request.headers.get('x-clerk-user-id') || '',
      ip_address: request.headers.get('x-forwarded-for') || '',
    })
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: data.title,
    })
    .match({ id: data.postId })

  if (error) {
    void logger.logError({
      message: 'PUT failed - Error updating post' + error.message,
      error_code: 'DATABASE_ERROR',
    })
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.2/post-title',
    http_method: 'PUT',
  })
  return okResponse('Post updated')
}
