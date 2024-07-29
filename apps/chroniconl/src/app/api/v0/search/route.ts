import joi from 'joi'
import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.search.POST'
const applicationName = 'chroniconl'
const environment = process.env.NODE_ENV as string || 'development'
const logger = new Logger(loggerName, applicationName, environment)

const searchSchema = joi.object({
  search: joi.string().required(),
  include_titles: joi.boolean().optional(),
  include_content: joi.boolean().optional(),
})

export async function POST(request: Request) {
	const start = performance.now();
  const { error: userError } = await getCurrentUser()
  if (userError) {
		void logger.logError({
			message: 'POST failed - Error getting user' + JSON.stringify(userError),
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  const { error: validationError } = searchSchema.validate(requestData)
  if (validationError) {
		void logger.logError({
			message: 'POST failed - Error validating request data' + validationError.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(validationError.message)
  }

  const { search, include_titles, include_content } = requestData

  if (!search) {
		void logger.logError({
			message: 'POST failed - No search term provided.',
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse('No search term provided.')
  }

  let results: any[] = []

  if (include_titles) {
    const { data: titleSearchResults, error: titleSearchError } = await supabase
      .from('posts')
      .select('*')
      .textSearch('title', search)

    if (titleSearchError) {
			void logger.logError({
				message: 'POST failed - Error searching for titles' + titleSearchError.message,
				error_code: 'E001',
				exception_type: 'Error',			
			})
      return failResponse(titleSearchError.message)
    }

    results = [...results, ...titleSearchResults]
  }

  if (include_content) {
    const { data: contentSearchResults, error: contentSearchError } =
      await supabase.from('posts').select('*').textSearch('content', search)

    if (contentSearchError) {
			void logger.logError({
				message: 'POST failed - Error searching for content' + contentSearchError.message,
				error_code: 'E001',
				exception_type: 'Error',			
			})
      return failResponse(contentSearchError.message)
    }

    results = [...results, ...contentSearchResults]
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'POST executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0/search',
		http_method: 'POST'
	});
  return okResponse({
    searchResults: results,
    searchResultCount: results.length,
  })
}
