import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { utapi } from '@/server/utapi'
import { getCurrentUser } from '@/server/getCurrentUser'
import Logger from '@/utils/logger'
const loggerName = 'api.v0.document.image-delete.DELETE'
const applicationName = 'chroniconl'
const environment = process.env.NODE_ENV as string || 'development'
const logger = new Logger(loggerName, applicationName, environment)

export async function DELETE(request: Request) {
	const start = performance.now();

  const { error: userError } = await getCurrentUser()
  if (userError) {
		void logger.logError({
			message: 'DELETE failed - Error getting user' + JSON.stringify(userError),
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse('Trouble getting user')
  }

  const requestData = await request.json()

  if (!requestData.id) {
		void logger.logError({
			message: 'DELETE failed - Document ID is required',
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse('Document ID is required')
  }

  if (!requestData.imageId) {
		void logger.logError({
			message: 'DELETE failed - Image ID is required',
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse('Image ID is required')
  }

  // Remove from UploadThing
  const { success } = await utapi.deleteFiles(requestData.imageId)
  if (!success) {
		void logger.logError({
			message: 'DELETE failed - Image wasn\'t deleted. Please contact support.',
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse("Image wasn't deleted. Please contact support.")
  }

  const { error } = await supabase
    .from('posts')
    .update({
      image_url: null,
      image_id: null,
      image_alt: null,
      image_caption: null,
			last_updated: new Date()
    })
    .match({ id: requestData.id })

  if (error) {
		void logger.logError({	
			message: 'DELETE failed - Error updating image url' + error.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(error?.message)
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'DELETE executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0/document/image-delete',
		http_method: 'DELETE'
	});
  return okResponse('Documents image url updated')
}
