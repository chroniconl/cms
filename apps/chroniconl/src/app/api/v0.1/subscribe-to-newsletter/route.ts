import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

const schema = joi.object({
  email: joi.string().required(),
})

export async function POST(request: Request) {
  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)
  if (validationError) {
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: requestData.email,
  })

  if (error?.code === '23505') {
    return failResponse('Email already subscribed')
  } else if (error) {
    console.error(error)
    return failResponse('Something went wrong')
  }

  return okResponse('You have successfully subscribed to our newsletter.')
}
