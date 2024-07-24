import { getCurrentUser } from '@/server/getCurrentUser'
import { formatSlug } from '@/utils/formatSlug'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'

export async function POST(request: Request) {
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    return failResponse('Trouble getting user')
  }

  console.log(userData)
  const requestData = await request.json()
  const { data, error } = await supabase
    .from('legal_documents')
    .insert({
      title: requestData.title,
      slug: formatSlug(requestData.slug),
      user_id: userData?.id,
      content: '<p>Nothing here yet</p>',
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    return failResponse(error?.message)
  }

  return okResponse(data, 'Document created')
}
