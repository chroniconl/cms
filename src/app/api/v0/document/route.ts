import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'

export async function PUT(request: Request) {
  const requestData = await request.json()
  const { error } = await supabase
    .from('posts')
    .update({
      title: requestData.title,
      content: requestData.content,
    })
    .match({ slug: requestData.slug })

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse('Document updated')
}
