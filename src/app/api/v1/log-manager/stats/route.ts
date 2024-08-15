import { getCurrentUser } from '@/server/getCurrentUser'
import {
  bypassOkResponse,
  failResponse,
  okResponse,
  skirtFailedResponse,
} from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  logManagerStats__v1__AuthError,
  logManagerStats__v1__DatabaseError,
  logManagerStats__v1__PerformanceSuccess,
} from './loggingActions'

// TODO: Add pagination
export async function GET(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void logManagerStats__v1__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  // 1 hour but in milliseconds
  const duration = 60 * 60 * 1000
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - duration)

  const { data, error } = await supabase
    .from('__raw_logs')
    .select('*', { count: 'exact' })
    .gte('timestamp', oneHourAgo.toISOString())
    .lt('timestamp', now.toISOString())

  if (error) {
    void logManagerStats__v1__DatabaseError(error)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logManagerStats__v1__PerformanceSuccess(start, end)
  return okResponse(data, 'Success')
}
