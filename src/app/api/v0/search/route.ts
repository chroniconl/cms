import joi from 'joi'
import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'

const searchSchema = joi.object({
  search: joi.string().required(),
  include_titles: joi.boolean().optional(),
  include_content: joi.boolean().optional(),
})

export async function POST(request: Request) {
  const { error: userError } = await getCurrentUser()
  if (userError) {
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const { error: validationError } = searchSchema.validate(requestData)
  if (validationError) {
    return failResponse(validationError.message)
  }

  const { search, include_titles, include_content } = requestData

  if (!search) {
    return failResponse('No search term provided.')
  }

  let results: any[] = []

  if (include_titles) {
    const { data: titleSearchResults, error: titleSearchError } = await supabase
      .from('posts')
      .select('*')
      .textSearch('title', search)

    if (titleSearchError) {
      return failResponse(titleSearchError.message)
    }

    results = [...results, ...titleSearchResults]
  }

  if (include_content) {
    const { data: contentSearchResults, error: contentSearchError } =
      await supabase.from('posts').select('*').textSearch('content', search)

    if (contentSearchError) {
      return failResponse(contentSearchError.message)
    }

    results = [...results, ...contentSearchResults]
  }

  return okResponse({
    searchResults: results,
    searchResultCount: results.length,
  })
}
