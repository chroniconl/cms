import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { utapi } from '@/server/utapi'
import { getCurrentUser } from '@/server/getCurrentUser'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

export async function DELETE(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.document.image-delete.DELETE',
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

  if (!requestData.imageId) {
    void logger.logValidationError({ message: 'Image ID is required' })
    return failResponse('Image ID is required')
  }

  // Remove from UploadThing
  const { success } = await utapi.deleteFiles(requestData.imageId)
  if (!success) {
    void logger.logUploadThingError({
      message: "Image wasn't deleted. Please contact support.",
    })
    return failResponse("Image wasn't deleted. Please contact support.")
  }

  const { error } = await supabase
    .from('posts')
    .update({
      image_url: null,
      image_id: null,
      image_alt: null,
      image_caption: null,
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
  return okResponse('Documents image url updated')
}
