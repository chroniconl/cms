import { getCurrentUser } from '@/server/getCurrentUser'
import { toPST } from '@/utils/dates'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

interface PublishDetailsApiProps {
  id: string
  visibility?: string
  publishDateDay?: Date
  publishDateTime?: string
}

export async function PUT(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.1.document.publish-details.PUT',
    request: request,
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const requestData = (await request.json()) as PublishDetailsApiProps

  const schema = joi.object({
    id: joi.string().required(),
    visibility: joi.string().optional(),
    publishDateDay: joi.date().optional(),
    publishDateTime: joi.string().optional(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void logger.logValidationError(validationError)
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
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse('Document updated')
}
