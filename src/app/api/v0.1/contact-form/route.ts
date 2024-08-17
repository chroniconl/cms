import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.contact-form.POST',
  httpMethod: 'POST',
})

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
    void logger.logValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('contact_form').insert({
    name: requestData?.name,
    email: requestData?.email,
    phone: requestData?.phone,
    message: requestData?.message,
  })

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse('Error submitting contact form')
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse('Contact form submitted')
}
