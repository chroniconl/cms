import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const schema = joi.object({
  url: joi.string().required(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v1.trendy.observatory-search.POST',
    httpMethod: 'POST',
  })

  const { data: userData, error: userError } = await getCurrentUser()
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

  const trendyResponse = await fetch(
    process.env.TRENDY_API_URL + '/v1/research/preview?url=' + requestData.url,
  )

  const responseData = await trendyResponse.json()

  if (responseData.error) {
    void logger.logGeneralError(responseData)
    return failResponse("Couldn't fetch data")
  }

  const { error: trendyError } = await supabase
    .from('chroniconl__trendy__url_history')
    .insert({
      full_url: requestData.url,
      page_title: responseData?.title,
      raw_contents: responseData.content,
      head_content_only: responseData.head_content_only,
      body_content_only: responseData.body_content_only,
    })
    .select()

  if (trendyError) {
    void logger.logDatabaseError(trendyError)
    return failResponse("Couldn't insert data")
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  return okResponse(responseData, 'Success')
}
