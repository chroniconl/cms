import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'

export async function DELETE(request: Request) {
  const requestData = await request.json()
  const { error } = await supabase
    .from('posts')
    .delete()
    .match({ id: requestData.id })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse('Document deleted')
}
