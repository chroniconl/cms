import { getCurrentUser } from '@/server/getCurrentUser'
import { formatSlug } from '@/utils/formatSlug'
import Logger from '@/utils/logger'
import {
  bypassOkResponse,
  failResponse,
  okResponse,
  skirtFailedResponse,
} from '@/utils/response'
import { supabase } from '@/utils/supabase'

const loggerName = 'api.v0.document.create.POST'
const applicationName = 'chroniconl'
const environment = process.env.NODE_ENV as string || 'development'
const logger = new Logger(loggerName, applicationName, environment)
	
async function createDocumentWithTitle(title: string): Promise<any> {
  try {
    const { data: userData, error: userError } = await getCurrentUser()
    if (userError) {
			void logger.logError({
				message: 'POST failed - Error getting user' + JSON.stringify(userError),
				error_code: 'E001',
				exception_type: 'Error',			
			})
      return failResponse('Trouble getting user')
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: title,
        content: '<p>Nothing here yet</p>',
        slug: formatSlug(title),
        user_id: userData?.id,
				last_updated: new Date()
      })
      .select()

    if (error) {
			void logger.logError({
				message: 'POST failed - Error creating document' + error.message,
				error_code: 'E001',
				exception_type: 'Error',			
			})
      if (error.code === '23505') {
        return skirtFailedResponse('Document with that title already exists')
      }

      return skirtFailedResponse('Failed to create document')
    }
    return bypassOkResponse(data[0].slug)
  } catch (error) {
		void logger.logError({
			message: 'POST failed - Error creating document',
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return skirtFailedResponse('Failed to create document')
  }
}

export async function POST(request: Request) {
	const start = performance.now();
  const data = await request.json()

  const responseObject = await createDocumentWithTitle(data.title)

  if (responseObject?.error === true) {
		void logger.logError({
			message: 'POST failed - Error creating document' + responseObject.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(responseObject.message)
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'POST executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0/document/create',
		http_method: 'POST'
	});
  return okResponse(responseObject.data)
}
