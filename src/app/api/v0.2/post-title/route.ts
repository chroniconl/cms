import { supabase } from '@/utils/supabase'
import { failResponse, okResponse } from '@/utils/response'
import Joi from 'joi'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'
import { getCurrentUser } from '@/server/getCurrentUser'

const schema = Joi.object({
  postId: Joi.string().required(),
  title: Joi.string().required(),
})

export async function PUT(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.2.post-title.PUT',
    request: request,
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError || !userData) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const data = await request.json()

  const { error: validationError } = schema.validate(data)
  if (validationError) {
    void logger.logValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: data.title,
    })
    .match({ id: data.postId })

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse('Post updated')
}
