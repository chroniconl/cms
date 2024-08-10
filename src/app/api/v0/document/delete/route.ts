import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  documentDelete__v0__AuthError,
  documentDelete__v0__DatabaseError,
  documentDelete__v0__PerformanceSuccess,
} from './loggingActions'

export async function DELETE(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void documentDelete__v0__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()
  const { error } = await supabase
    .from('posts')
    .delete()
    .match({ id: requestData.id })

  if (error) {
    void documentDelete__v0__DatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void documentDelete__v0__PerformanceSuccess(start, end)
  return okResponse('Document deleted')
}
