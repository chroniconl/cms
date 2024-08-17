import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.document.filterable-data.POST',
  httpMethod: 'POST',
})

const schema = joi.object({
  id: joi.string().required(),
  category_id: joi.string().allow('').optional(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void logger.logValidationError(validationError)
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
      void logger.logDatabaseError(postError)
      return failResponse(postError?.message)
    }
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  return okResponse('Document updated')
}
