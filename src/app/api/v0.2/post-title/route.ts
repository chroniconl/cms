import { supabase } from '@/utils/supabase'
import { failResponse, okResponse } from '@/utils/response'
import Joi from 'joi'

import {
  postTitle__v0_2__ValidationError,
  postTitle__v0_2__DatabaseError,
  postTitle__v0_2__PerformanceSuccess,
} from './loggingActions'

const schema = Joi.object({
  postId: Joi.string().required(),
  title: Joi.string().required(),
})

export async function PUT(request: Request) {
  const start = performance.now()
  const data = await request.json()

  const { error: validationError } = schema.validate(data)
  if (validationError) {
    void postTitle__v0_2__ValidationError(validationError, request)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: data.title,
    })
    .match({ id: data.postId })

  if (error) {
    void postTitle__v0_2__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void postTitle__v0_2__PerformanceSuccess(start, end)
  return okResponse('Post updated')
}
