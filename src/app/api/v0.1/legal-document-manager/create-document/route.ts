import { getCurrentUser } from '@/server/getCurrentUser'
import { formatSlug } from '@/utils/formatSlug'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  legalDocumentCreate__v0_1__AuthError,
  legalDocumentCreate__v0_1__DatabaseError,
  legalDocumentCreate__v0_1__PerformanceSuccess,
} from './loggingActions'

export async function POST(request: Request) {
  const start = performance.now()

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void legalDocumentCreate__v0_1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

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
    void legalDocumentCreate__v0_1__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void legalDocumentCreate__v0_1__PerformanceSuccess(start, end)
  return okResponse(data, 'Document created')
}
