import { getCurrentUser } from '@/server/getCurrentUser'
import { toPST } from '@/utils/dates'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  publishDetails__v0_1__AuthError,
  publishDetails__v0_1__ValidationError,
  publishDetails__v0_1__DatabaseError,
  publishDetails__v0_1__PerformanceSuccess,
} from './loggingActions'

interface PublishDetailsApiProps {
  id: string
  visibility?: string
  publishDateDay?: Date
  publishDateTime?: string
}

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void publishDetails__v0_1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = (await request.json()) as PublishDetailsApiProps

  const schema = joi.object({
    id: joi.string().required(),
    visibility: joi.string().optional(),
    publishDateDay: joi.date().optional(),
    publishDateTime: joi.string().optional(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void publishDetails__v0_1__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('posts')
    .update({
      visibility: requestData?.visibility || null,
      publish_date_day: requestData?.publishDateDay
        ? toPST(requestData?.publishDateDay)
        : null,
      publish_date_time: requestData?.publishDateTime || null,
      last_updated: new Date(),
    })
    .match({ id: requestData?.id })

  if (error) {
    void publishDetails__v0_1__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void publishDetails__v0_1__PerformanceSuccess(start, end)
  return okResponse('Document updated')
}
