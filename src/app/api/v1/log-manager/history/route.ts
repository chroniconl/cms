import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  logManagerHistory__v1__AuthError,
  logManagerHistory__v1__DatabaseError,
  logManagerHistory__v1__PerformanceSuccess,
} from './loggingActions'

// TODO: Add pagination
export async function GET(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logManagerHistory__v1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const {
    data: logData,
    error: trendyError,
    count,
  } = await supabase
    .from('__raw_logs')
    .select('*', { count: 'exact' })
    .order('timestamp', { ascending: false })

  if (trendyError) {
    void logManagerHistory__v1__DatabaseError(trendyError)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logManagerHistory__v1__PerformanceSuccess(start, end)
  return okResponse(
    {
      logs: logData,
      count: count as number,
    },
    'Success',
  )
}
