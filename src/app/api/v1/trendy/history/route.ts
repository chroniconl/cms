import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  trendyHistory__v1__AuthError,
  trendyHistory__v1__DatabaseError,
  trendyHistory__v1__PerformanceSuccess,
} from './loggingActions'

// TODO: Add pagination
export async function GET(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void trendyHistory__v1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const { data: trendyData, error: trendyError } = await supabase
    .from('chroniconl__trendy__url_history')
    .select('*', { count: 'exact' })

  if (trendyError) {
    void trendyHistory__v1__DatabaseError(trendyError)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void trendyHistory__v1__PerformanceSuccess(start, end)
  return okResponse(trendyData, 'Success')
}
