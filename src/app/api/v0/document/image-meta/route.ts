import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.document.image-metadata.PUT',
    request: request,
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const requestData = await request.json()

  if (!requestData.id) {
    void logger.logValidationError({ message: 'Document ID is required' })
    return failResponse('Document ID is required')
  }

  // Remove from Supabase
  const { error } = await supabase
    .from('posts')
    .update({
      image_caption: requestData?.image_caption || '',
      image_alt: requestData?.image_alt || '',
      last_updated: new Date(),
    })
    .match({ id: requestData.id })

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(
    {
      image_alt: requestData.image_alt,
      image_caption: requestData.image_caption,
    },
    'Documents image meta updated',
  )
}
