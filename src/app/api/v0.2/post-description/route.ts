import { supabase } from '@/utils/supabase'
import { failResponse, okResponse } from '@/utils/response'
import Joi from 'joi'

import {
  postDescription__v0_2__ValidationError,
  postDescription__v0_2__DatabaseError,
  postDescription__v0_2__PerformanceSuccess,
} from './loggingActions'

const schema = Joi.object({
  postId: Joi.string().required(),
  description: Joi.string().required(),
})

export async function PUT(request: Request) {
  const start = performance.now()
  const data = await request.json()

  const { error: validationError } = schema.validate(data)
  if (validationError) {
    void postDescription__v0_2__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      description: data.description,
    })
    .match({ id: data.postId })

  if (error) {
    void postDescription__v0_2__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void postDescription__v0_2__PerformanceSuccess(start, end)
  return okResponse('Post updated')
}
