import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

export async function DELETE(request: Request) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.document.delete.DELETE',
    httpMethod: 'DELETE',
  })

  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error } = await supabase
    .from('posts')
    .delete()
    .match({ id: requestData.id })

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse('Document deleted')
}
