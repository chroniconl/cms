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

const logger = new Logger({
  name: 'api.v0.document.create.POST',
  httpMethod: 'POST',
})

async function createDocumentWithTitle(title: string): Promise<any> {
  try {
    const { data: userData, error: userError } = await getCurrentUser()
    if (userError) {
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
        last_updated: new Date(),
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

export async function POST(request: Request) {
  const start = performance.now()
  const data = await request.json()

  const responseObject = await createDocumentWithTitle(data.title)

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
