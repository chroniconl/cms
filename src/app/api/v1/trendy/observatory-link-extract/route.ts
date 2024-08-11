import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  observatoryLinkExtract__v1__AuthError,
  observatoryLinkExtract__v1__ValidationError,
  observatoryLinkExtract__v1__TrendyAPIError,
  observatoryLinkExtract__v1__DatabaseError,
  observatoryLinkExtract__v1__PerformanceSuccess,
} from './loggingActions'

const schema = joi.object({
  og_url: joi.string().required(),
  raw_contents: joi.string().required(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void observatoryLinkExtract__v1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = schema.validate(requestData)
  if (validationError) {
    void observatoryLinkExtract__v1__ValidationError(validationError)
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
    void observatoryLinkExtract__v1__TrendyAPIError(responseData.error)
    return failResponse("Couldn't fetch data")
  }

  // const { data: trendyData, error: trendyError } = await supabase
  //   .from('chroniconl__trendy__url_history')
  //   .insert({
  //     full_url: requestData.url,
  //     page_title: responseData?.title,
  //     raw_contents: responseData.content,
  //   })
  //   .select()

  // if (trendyError) {
  //   void observatoryLinkExtract__v1__DatabaseError(trendyError)
  //   return failResponse("Couldn't insert data")
  // }

  const end = performance.now()
  void observatoryLinkExtract__v1__PerformanceSuccess(start, end)

  return okResponse(responseData, 'Success')
}
