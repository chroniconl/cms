import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  contactForm__v0_1__ValidationError,
  contactForm__v0_1__DatabaseError,
  contactForm__v0_1__PerformanceSuccess,
} from './loggingActions'

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  message: joi.string().required(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void contactForm__v0_1__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('contact_form').insert({
    name: requestData?.name,
    email: requestData?.email,
    phone: requestData?.phone,
    message: requestData?.message,
  })

  if (error) {
    void contactForm__v0_1__DatabaseError(error)
    return failResponse('Error submitting contact form')
  }

  const end = performance.now()
  void contactForm__v0_1__PerformanceSuccess(start, end)
  return okResponse('Contact form submitted')
}
