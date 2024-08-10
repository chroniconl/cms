import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  subscribeNewsletter__v0_1__ValidationError,
  subscribeNewsletter__v0_1__DuplicateEmailError,
  subscribeNewsletter__v0_1__GeneralDatabaseError,
  subscribeNewsletter__v0_1__PerformanceSuccess,
} from './loggingActions'

const schema = joi.object({
  email: joi.string().required(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)
  if (validationError) {
    void subscribeNewsletter__v0_1__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: requestData.email,
  })

  if (error?.code === '23505') {
    void subscribeNewsletter__v0_1__DuplicateEmailError(error)
    return failResponse('Email already subscribed')
  } else if (error) {
    void subscribeNewsletter__v0_1__GeneralDatabaseError(error)
    return failResponse('Something went wrong')
  }

  const end = performance.now()
  void subscribeNewsletter__v0_1__PerformanceSuccess(start, end)
  return okResponse('You have successfully subscribed to our newsletter.')
}
