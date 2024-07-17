import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

export async function POST(request: Request) {
  const requestData = await request.json()

  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    message: joi.string().required(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('contact_form').insert({
    name: requestData?.name,
    email: requestData?.email,
    phone: requestData?.phone,
    message: requestData?.message,
  })

  if (error) {
    console.error(error, 'Error submitting contact form')
    return failResponse('Error submitting contact form')
  }

  return okResponse('Contact form submitted')
}
