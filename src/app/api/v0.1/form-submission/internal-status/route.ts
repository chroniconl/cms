import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  formSubmissionStatus__v0_1__AuthError,
  formSubmissionStatus__v0_1__ValidationError,
  formSubmissionStatus__v0_1__DatabaseError,
  formSubmissionStatus__v0_1__PerformanceSuccess,
} from './loggingActions'

const schema = joi.object({
  id: joi.string().required(),
  internal__status: joi.string().required().valid('UNSEEN', 'SEEN'),
})

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void formSubmissionStatus__v0_1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void formSubmissionStatus__v0_1__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('contact_form')
    .update({
      internal__status: requestData.internal__status,
    })
    .match({ id: requestData.id })

  if (error) {
    void formSubmissionStatus__v0_1__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void formSubmissionStatus__v0_1__PerformanceSuccess(start, end)
  return okResponse(
    requestData.internal__status,
    'Form submission internal status updated',
  )
}
