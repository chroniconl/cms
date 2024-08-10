import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  imageMetadata__v0__AuthError,
  imageMetadata__v0__MissingDocumentIDError,
  imageMetadata__v0__DatabaseError,
  imageMetadata__v0__PerformanceSuccess,
} from './loggingActions'

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void imageMetadata__v0__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  if (!requestData.id) {
    void imageMetadata__v0__MissingDocumentIDError()
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
    void imageMetadata__v0__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void imageMetadata__v0__PerformanceSuccess(start, end)
  return okResponse(
    {
      image_alt: requestData.image_alt,
      image_caption: requestData.image_caption,
    },
    'Documents image meta updated',
  )
}
