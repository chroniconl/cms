import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { utapi } from '@/server/utapi'
import { getCurrentUser } from '@/server/getCurrentUser'
import {
  imageDelete__v0__AuthError,
  imageDelete__v0__MissingDocumentIDError,
  imageDelete__v0__MissingImageIDError,
  imageDelete__v0__UploadThingError,
  imageDelete__v0__DatabaseError,
  imageDelete__v0__PerformanceSuccess,
} from './loggingActions'

export async function DELETE(request: Request) {
  const start = performance.now()

  const { error: userError } = await getCurrentUser()
  if (userError) {
    void imageDelete__v0__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  if (!requestData.id) {
    void imageDelete__v0__MissingDocumentIDError()
    return failResponse('Document ID is required')
  }

  if (!requestData.imageId) {
    void imageDelete__v0__MissingImageIDError()
    return failResponse('Image ID is required')
  }

  // Remove from UploadThing
  const { success } = await utapi.deleteFiles(requestData.imageId)
  if (!success) {
    void imageDelete__v0__UploadThingError()
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
    void imageDelete__v0__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void imageDelete__v0__PerformanceSuccess(start, end)
  return okResponse('Documents image url updated')
}
