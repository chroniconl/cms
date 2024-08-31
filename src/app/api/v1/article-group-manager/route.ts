import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import joi from 'joi'
import { openai } from '@/utils/openai'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'
import { sub } from 'date-fns'
import { supabase } from '@/utils/supabase'

// articles: Json | null
// created_at: string
// heading: string | null
// id: string
// reference_name: string | null
// shareable_id: string | null
// subheading: string | null
// updated_at: string |

const schema = joi.object({
  articles: joi.array().items(joi.object()).optional().allow(null),
  heading: joi.string().optional().allow('').allow(null),
  subheading: joi.string().required().optional().allow('').allow(null),
  reference_name: joi.string().required().optional().allow('').allow(null),
})

export async function POST(request: NextRequest) {
  const start = performance.now()

  // Boilerplate
  const logger = new Logger({
    name: 'API_V1_ARTICLE_GROUP_MANAGER_POST',
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
  const { value: safeData, error: validationError } =
    schema.validate(requestData)

  if (validationError) {
    void logger.logValidationError(validationError)
    return failResponse(validationError.message)
  }
  // End Boilerplate

  // if safe data is empty, return early
  if (
    (safeData.articles.length === 0 || safeData.articles === null) &&
    safeData.heading === null &&
    safeData.subheading === null &&
    safeData.reference_name === null
  ) {
    return okResponse({ data: null, error: null }, 'Success')
  }

  // post to supabase
  const { data: supabaseData, error: supabaseError } = await supabase
    .from('article_group_manager')
    .insert({
      articles: safeData.articles,
      heading: safeData.heading,
      subheading: safeData.subheading,
      reference_name: safeData.reference_name,
    })

  if (supabaseError) {
    void logger.logDatabaseError(supabaseError)
    return failResponse('Error creating article group')
  }

  // Cleanup
  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  // Response
  return okResponse(supabaseData, 'Success')
}
