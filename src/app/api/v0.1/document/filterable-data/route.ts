import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  filterableData__v0_1__AuthError,
  filterableData__v0_1__ValidationError,
  filterableData__v0_1__DatabaseError,
  filterableData__v0_1__PerformanceSuccess,
} from './loggingActions'

const schema = joi.object({
  id: joi.string().required(),
  category_id: joi.string().allow('').optional(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void filterableData__v0_1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void filterableData__v0_1__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  if (requestData.category_id) {
    const { error: postError } = await supabase
      .from('posts')
      .update({
        category_id: requestData.category_id,
        last_updated: new Date(),
      })
      .match({ id: requestData.id })

    if (postError) {
      void filterableData__v0_1__DatabaseError(postError)
      return failResponse(postError?.message)
    }
  }

  const end = performance.now()
  void filterableData__v0_1__PerformanceSuccess(start, end)

  return okResponse('Document updated')
}
