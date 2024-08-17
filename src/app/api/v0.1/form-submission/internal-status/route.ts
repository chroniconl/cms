import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

const schema = joi.object({
  id: joi.string().required(),
  internal__status: joi.string().required().valid('UNSEEN', 'SEEN'),
})

export async function PUT(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.1.form-submission.internal-status.PUT',
    request: request,
  })
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void logger.logValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('contact_form')
    .update({
      internal__status: requestData.internal__status,
    })
    .match({ id: requestData.id })

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  return okResponse(
    requestData.internal__status,
    'Form submission internal status updated',
  )
}
