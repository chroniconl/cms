import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

const createAuthorSchema = joi.object({
  name: joi.string().required(),
  link_to: joi.string().required(),
  avatar_url: joi.string().optional().allow(''),
  avatar_id: joi.string().optional().allow(''),
})

export async function POST(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.1.authors.create-author.POST',
    request: request,
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError || userData === null) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const requestData = await request.json()
  const { error: validationError } = createAuthorSchema.validate(requestData)

  if (validationError) {
    void logger.logValidationError(validationError)
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
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(data, 'Avatar created')
}
