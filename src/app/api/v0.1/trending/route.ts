import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  trending__v0_1__ValidationError,
  trending__v0_1__DatabaseError,
  trending__v0_1__PerformanceSuccess,
} from './loggingActions'

// HEY MAT, HERE'S A LAZY LOAD EXAMPLE
export async function GET(request: Request) {
  const start = performance.now()
  const url = new URL(request.url)
  const params = url.searchParams

  // Define schema for query parameters
  const schema = joi.object({
    limit: joi.number().integer().min(1).default(10),
    offset: joi.number().integer().min(0).default(0),
  })

  // Validate query parameters
  const { error, value } = schema.validate({
    limit: params.get('limit'),
    offset: params.get('offset'),
  })

  if (error) {
    void trending__v0_1__ValidationError(error)
    return failResponse(error?.details[0]?.message)
  }

  const { limit, offset } = value

  // Fetch data with pagination
  const { data, error: supabaseError } = await supabase
    .from('repo_trends')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
    .range(offset, offset + limit)

  if (supabaseError) {
    void trending__v0_1__DatabaseError(supabaseError)
    return failResponse(supabaseError?.message)
  }

  const end = performance.now()
  void trending__v0_1__PerformanceSuccess(start, end)
  return okResponse(data)
}
