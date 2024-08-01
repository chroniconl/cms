import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.document.image-metadata.PUT'
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

  if (!requestData.id) {
    void logger.logError({
      message: 'PUT failed - Document ID is required',
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse('Document ID is required')
  }

  if (!requestData.image_id) {
    void logger.logError({
      message: 'PUT failed - Image ID is required',
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse('Image ID is required')
  }

  // Remove from Supabase
  const { error } = await supabase
    .from('posts')
    .update({
      image_url: requestData.image_url,
      image_id: requestData.image_id,
      last_updated: new Date(),
    })
    .match({ id: requestData.id })

  if (error) {
    void logger.logError({
      message: 'PUT failed - Error updating image url' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document/image-upload',
    http_method: 'PUT',
  })
  return okResponse(
    {
      image_url: requestData.image_url,
      image_id: requestData.image_id,
    },
    'Documents image url updated',
  )
}
