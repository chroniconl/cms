import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  document__v0__AuthError,
  document__v0__DatabaseError,
  document__v0__PerformanceSuccess,
} from './loggingActions'

export async function PUT(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void document__v0__AuthError(userError)
    return failResponse('Trouble getting user')
  }
  const requestData = await request.json()
  const { error } = await supabase
    .from('posts')
    .update({
      title: requestData.title,
      content: requestData.content,
      last_updated: new Date(),
    })
    .match({ slug: requestData.slug })

  if (error) {
    void document__v0__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void document__v0__PerformanceSuccess(start, end)
  return okResponse('Document updated')
}
