import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  observatorySearch__v1__AuthError,
  observatorySearch__v1__ValidationError,
  observatorySearch__v1__TrendyAPIError,
  observatorySearch__v1__DatabaseError,
  observatorySearch__v1__PerformanceSuccess,
} from './loggingActions'

const schema = joi.object({
  url: joi.string().required(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void observatorySearch__v1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void observatorySearch__v1__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const trendyResponse = await fetch(
    process.env.TRENDY_API_URL + '/v1/research/preview?url=' + requestData.url,
  )

  const responseData = await trendyResponse.json()

  if (responseData.error) {
    void observatorySearch__v1__TrendyAPIError(responseData.error)
    return failResponse("Couldn't fetch data")
  }

  const { data: trendyData, error: trendyError } = await supabase
    .from('chroniconl__trendy__url_history')
    .insert({
      full_url: requestData.url,
      page_title: responseData?.title,
      raw_contents: responseData.content,
    })
    .select()

  if (trendyError) {
    void observatorySearch__v1__DatabaseError(trendyError)
    return failResponse("Couldn't insert data")
  }

  const end = performance.now()
  void observatorySearch__v1__PerformanceSuccess(start, end)

  return okResponse(responseData, 'Success')
}
