import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import joi from 'joi'
import { openai } from '@/utils/openai'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

const schema = joi.object({
  html_content: joi.string().required(),
  type: joi
    .string()
    .required()
    .allow('extract_links', 'extract_text', 'custom'),
  prompt: joi.string().optional().allow('').allow(null),
})

export async function POST(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v1.trendy.observatory-action.POST',
    request: request,
  })

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
      void logger.logChatGpt(responseData)

      // TODO AI prompt with html_content
    } catch (error) {
      void logger.logGeneralError(error)
      return failResponse("Couldn't fetch data")
    }
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  return okResponse(responseData, 'Success')
}
