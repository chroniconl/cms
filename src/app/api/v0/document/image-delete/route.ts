import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { utapi } from '@/server/utapi'

export async function DELETE(request: Request) {
  const requestData = await request.json()

  if (!requestData.id) {
    return failResponse('Document ID is required')
  }

  if (!requestData.imageId) {
    return failResponse('Image ID is required')
  }

  // Remove from UploadThing
  const { success } = await utapi.deleteFiles(requestData.imageId)
  if (!success) {
    return failResponse("Image wasn't deleted. Please contact support.")
  }

  const { error } = await supabase
    .from('posts')
    .update({
      image_url: null,
      image_id: null,
      image_alt: null,
      image_caption: null,
    })
    .match({ id: requestData.id })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse('Documents image url updated')
}
