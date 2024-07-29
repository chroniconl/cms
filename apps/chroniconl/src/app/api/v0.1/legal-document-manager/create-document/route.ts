import { getCurrentUser } from '@/server/getCurrentUser'
import { formatSlug } from '@/utils/formatSlug'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = process.env.NODE_ENV as string || 'development'
const logger = new Logger(loggerName, applicationName, environment)

export async function POST(request: Request) {
	const start = performance.now();

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
		void logger.logError({
			message: 'POST failed - Error getting user' + JSON.stringify(userError),
			error_code: 'E001',
			exception_type: 'Error',			
		})
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
		void logger.logError({
			message: 'POST failed - Error creating document' + error.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
		
    return failResponse(error?.message)
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'POST executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0.1/document/create',
		http_method: 'POST'
	});
  return okResponse(data, 'Document created')
}
