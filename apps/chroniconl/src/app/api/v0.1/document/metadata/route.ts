import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

export async function PUT(request: Request) {
  const { error: userError } = await getCurrentUser()
  if (userError) {
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const schema = joi.object({
    id: joi.string().required(),
    title: joi.string().optional(),
    description: joi.string().optional(),
    author_id: joi.string().optional(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: requestData?.title || null,
      description: requestData?.description || null,
      author_id: requestData?.author_id || '',
    })
    .match({ id: requestData?.id })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse('Document updated')
}
