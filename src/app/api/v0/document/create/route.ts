import { getCurrentUser } from '@/server/getCurrentUser'
import { formatSlug } from '@/utils/formatSlug'
import {
  bypassOkResponse,
  failResponse,
  okResponse,
  skirtFailedResponse,
} from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

async function createDocumentWithTitle(
  title: string,
  request: NextRequest,
): Promise<any> {
  const logger = new Logger({
    name: 'api.v0.document.create.POST.createDocumentWithTitle',
    request: request,
  })
  try {
    const { data: userData, error: userError } = await getCurrentUser()
    if (userError || !userData) {
      void logger.logAuthError(userError)
      return failResponse('Trouble getting user')
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: title,
        content: '<p>Nothing here yet</p>',
        slug: formatSlug(title),
        user_id: userData?.id,
        last_updated: new Date().toISOString(),
      })
      .select()

    if (error) {
      if (error.code === '23505') {
        void logger.logGeneralError('Document with that title already exists')
        return skirtFailedResponse('Document with that title already exists')
      }

      void logger.logDatabaseError(error)
      return skirtFailedResponse('Failed to create document')
    }
    return bypassOkResponse(data[0].slug)
  } catch (error) {
    void logger.logDatabaseError(error)
    return skirtFailedResponse('Failed to create document')
  }
}

export async function POST(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.document.create.POST',
    request: request,
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError || !userData) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const data = await request.json()

  const responseObject = await createDocumentWithTitle(data.title, request)

  if (responseObject?.error === true) {
    void logger.logGeneralError(responseObject.message)
    return failResponse(responseObject.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(responseObject.data)
}
