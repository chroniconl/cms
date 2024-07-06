import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'

export async function PUT(request: Request) {
  const requestData = await request.json()

  if (!requestData.id) {
    return failResponse('Document ID is required')
  }

  if (!requestData.image_id) {
    return failResponse('Image ID is required')
  }

  // Remove from Supabase
  const { error } = await supabase
    .from('posts')
    .update({
      image_url: requestData.image_url,
      image_id: requestData.image_id,
    })
    .match({ id: requestData.id })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse(
    {
      image_url: requestData.image_url,
      image_id: requestData.image_id,
    },
    'Documents image url updated',
  )
}
