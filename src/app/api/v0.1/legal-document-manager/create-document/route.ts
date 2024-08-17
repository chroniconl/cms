import { getCurrentUser } from '@/server/getCurrentUser'
import { formatSlug } from '@/utils/formatSlug'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

export async function POST(request: Request) {
  const start = performance.now()

  const logger = new Logger({
    name: 'api.v0.1.legal-document-manager.create-document.POST',
    httpMethod: 'POST',
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
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
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(data, 'Document created')
}
