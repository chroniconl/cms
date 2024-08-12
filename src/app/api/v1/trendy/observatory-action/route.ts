import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  observatoryAction__v1__AuthError,
  observatoryAction__v1__ValidationError,
  observatoryAction__v1__TrendyAPIError,
  observatoryAction__v1__DatabaseError,
  observatoryAction__v1__PerformanceSuccess,
  observatoryAction__v1__StructuredDataError,
} from './loggingActions'
import { openai } from '@/utils/openai'

const schema = joi.object({
  html_content: joi.string().required(),
  type: joi
    .string()
    .required()
    .allow('extract_links', 'extract_text', 'custom'),
  prompt: joi.string().optional().allow('').allow(null),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void observatoryAction__v1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void observatoryAction__v1__ValidationError(validationError)
    return failResponse(validationError.message)
  }
  let responseData = {}
  if (requestData.type === 'custom') {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that responses with short answers.',
          },
          {
            role: 'user',
            content: `Here's my prompt:
            ${requestData.prompt} 

            Here's the HTML content:
            ${requestData.html_content} `,
          },
        ],
        model: 'gpt-4o',
      })

      responseData = {
        data: completion.choices[0].message.content,
        type: requestData.type,
      }
      void observatoryAction__v1__StructuredDataError(responseData)

      // TODO AI prompt with html_content
    } catch (error) {
      void observatoryAction__v1__StructuredDataError(error)
      return failResponse("Couldn't fetch data")
    }
  }

  // const trendyResponse = await fetch(
  //   process.env.TRENDY_API_URL + '/v1/research/preview/action',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       html_content: requestData.html_content,
  //       type: requestData.type,
  //       prompt: requestData.prompt,
  //     }),
  //   },
  // )

  // const responseData = await trendyResponse.json()

  // if (responseData.error) {
  //   void observatoryAction__v1__TrendyAPIError(responseData.error)
  //   return failResponse("Couldn't fetch data")
  // }

  // const { error: trendyError } = await supabase
  //   .from('chroniconl__trendy__url_history')
  //   .insert({
  //     full_url: requestData.url,
  //     page_title: responseData?.title,
  //     raw_contents: responseData.content,
  //     head_content_only: responseData.head_content_only,
  //     body_content_only: responseData.body_content_only,
  //   })
  //   .select()

  // if (trendyError) {
  //   void observatoryAction__v1__DatabaseError(trendyError)
  //   return failResponse("Couldn't insert data")
  // }

  const end = performance.now()
  void observatoryAction__v1__PerformanceSuccess(start, end)

  return okResponse(responseData, 'Success')
}
