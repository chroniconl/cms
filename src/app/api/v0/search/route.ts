import joi from 'joi'
import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  search__v0__AuthError,
  search__v0__ValidationError,
  search__v0__GeneralError,
  search__v0__PerformanceSuccess,
  search__v0__TitleSearchError,
  search__v0__ContentSearchError,
} from './loggingActions'

const searchSchema = joi.object({
  search: joi.string().required(),
  include_titles: joi.boolean().optional(),
  include_content: joi.boolean().optional(),
})

export async function POST(request: Request) {
  const start = performance.now()
  const { error: userError } = await getCurrentUser()
  if (userError) {
    void search__v0__AuthError(userError)
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const { error: validationError } = searchSchema.validate(requestData)
  if (validationError) {
    void search__v0__ValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { search, include_titles, include_content } = requestData

  if (!search) {
    void search__v0__GeneralError('No search term provided.')
    return failResponse('No search term provided.')
  }

  let results: any[] = []

  if (include_titles) {
    const { data: titleSearchResults, error: titleSearchError } = await supabase
      .from('posts')
      .select('*')
      .textSearch('title', search)

    if (titleSearchError) {
      void search__v0__TitleSearchError(titleSearchError)
      return failResponse(titleSearchError.message)
    }

    results = [...results, ...titleSearchResults]
  }

  if (include_content) {
    const { data: contentSearchResults, error: contentSearchError } =
      await supabase.from('posts').select('*').textSearch('content', search)

    if (contentSearchError) {
      void search__v0__ContentSearchError(contentSearchError)
      return failResponse(contentSearchError.message)
    }

    results = [...results, ...contentSearchResults]
  }

  const end = performance.now()
  void search__v0__PerformanceSuccess(start, end)
  return okResponse({
    searchResults: results,
    searchResultCount: results.length,
  })
}
