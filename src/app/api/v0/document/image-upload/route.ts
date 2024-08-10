import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  imageUpload__v0__AuthError,
  imageUpload__v0__MissingDocumentIDError,
  imageUpload__v0__MissingImageIDError,
  imageUpload__v0__DatabaseError,
  imageUpload__v0__PerformanceSuccess,
} from './loggingActions'

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void imageUpload__v0__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  if (!requestData.id) {
    void imageUpload__v0__MissingDocumentIDError()
    return failResponse('Document ID is required')
  }

  if (!requestData.image_id) {
    void imageUpload__v0__MissingImageIDError()
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
    void imageUpload__v0__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void imageUpload__v0__PerformanceSuccess(start, end)
  return okResponse(
    {
      image_url: requestData.image_url,
      image_id: requestData.image_id,
    },
    'Documents image url updated',
  )
}
