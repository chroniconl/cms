import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.document.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logError({
      message: 'PUT failed - Error getting user' + JSON.stringify(userError),
      error_code: 'E001',
      exception_type: 'Error',
    })
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
    void logger.logError({
      message: 'PUT failed - Error updating document' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document',
    http_method: 'PUT',
  })
  return okResponse('Document updated')
}
