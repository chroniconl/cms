import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  documentMetadata__v0_1__AuthError,
  documentMetadata__v0_1__ValidationError,
  documentMetadata__v0_1__DatabaseError,
  documentMetadata__v0_1__PerformanceSuccess,
} from './loggingActions'

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void documentMetadata__v0_1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const schema = joi.object({
    id: joi.string().required(),
    author_id: joi.string().optional(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void documentMetadata__v0_1__ValidationError(validationError)
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
    void documentMetadata__v0_1__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void documentMetadata__v0_1__PerformanceSuccess(start, end)
  return okResponse('Document updated')
}
