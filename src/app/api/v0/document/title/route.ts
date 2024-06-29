import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'

export async function PUT(request: Request) {
  const requestData = await request.json()

  if (!requestData.id) {
    return failResponse('Document ID is required')
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: requestData.title,
    })
    .match({ id: requestData.id })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse('Documents title updated')
}
