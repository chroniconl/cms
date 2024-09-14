import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import joi from 'joi'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

const schema = joi.object({
  og_url: joi.string().required(),
  raw_contents: joi.string().required(),
})

export async function POST(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v1.trendy.observatory-link-extract.POST',
    request: request,
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError || !userData) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const requestData = await request.json()
  const { error: validationError } = schema.validate(requestData)
  if (validationError) {
    void logger.logValidationError(validationError)
    return failResponse(validationError.message)
  }

  const trendyResponse = await fetch(
    process.env.TRENDY_API_URL + '/v1/research/extract-links',
    {
      method: 'POST',
      body: JSON.stringify({
        html_content: requestData.raw_contents,
        og_url: requestData.og_url,
      }),
    },
  )

  const responseData = await trendyResponse.json()

  if (responseData.error) {
    void logger.logGeneralError(responseData)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  return okResponse(responseData, 'Success')
}
