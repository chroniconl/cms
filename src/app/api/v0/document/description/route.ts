import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

export async function PUT(request: Request) {
  const requestData = await request.json()

  const schema = joi.object({
    id: joi.string().required(),
    description: joi.string().required(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      description: requestData.description,
    })
    .match({ id: requestData.id })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse('Documents description updated')
}
