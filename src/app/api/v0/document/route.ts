import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

export async function PUT(request: Request) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.document.PUT',
    httpMethod: 'PUT',
  })
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }
  const requestData = await request.json()
  const { error } = await supabase
    .from('posts')
    .update({
      title: requestData.title,
      content: requestData.content,
      last_updated: new Date(),
    })
    .match({ slug: requestData.slug })

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse('Document updated')
}
