import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  postAuthor__v0_2__AuthError,
  postAuthor__v0_2__ValidationError,
  postAuthor__v0_2__DatabaseError,
  postAuthor__v0_2__PerformanceSuccess,
} from './loggingActions'

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void postAuthor__v0_2__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const schema = joi.object({
    id: joi.string().required(),
    author_id: joi.string().optional(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void postAuthor__v0_2__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      author_id: requestData?.author_id || '',
      last_updated: new Date(),
    })
    .match({ id: requestData?.id })

  if (error) {
    void postAuthor__v0_2__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void postAuthor__v0_2__PerformanceSuccess(start, end)
  return okResponse('Document updated')
}
