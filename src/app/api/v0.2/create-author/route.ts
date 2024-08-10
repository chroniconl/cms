import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  createAuthor__v0_2__AuthError,
  createAuthor__v0_2__DatabaseError,
  createAuthor__v0_2__PerformanceSuccess,
  createAuthor__v0_2__ValidationError,
} from './loggingActions'

const createAuthorSchema = joi.object({
  name: joi.string().required(),
  link_to: joi.string().required(),
  avatar_url: joi.string().optional().allow(''),
  avatar_id: joi.string().optional().allow(''),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void createAuthor__v0_2__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = createAuthorSchema.validate(requestData)

  if (validationError) {
    void createAuthor__v0_2__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { data, error } = await supabase
    .from('authors')
    .insert({
      display_name: requestData?.name,
      href: requestData?.link_to,
      avatar_url: requestData?.avatar_url,
      avatar_id: requestData?.avatar_id,
      created_by: userData?.id,
    })
    .select()

  if (error) {
    void createAuthor__v0_2__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void createAuthor__v0_2__PerformanceSuccess(start, end)
  return okResponse(data, 'Avatar created')
}
