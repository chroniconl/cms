import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

const schema = joi.object({
  id: joi.string().required(),
  internal__status: joi.string().required().valid('UNSEEN', 'SEEN'),
})

export async function PUT(request: Request) {
  const {error: userError} = await getCurrentUser()
  if (userError) {
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('contact_form')
    .update({
      internal__status: requestData.internal__status,
    })
    .match({ id: requestData.id })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse(
    requestData.internal__status,
    'Form submission internal status updated',
  )
}
