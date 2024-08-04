import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

const schema = joi.object({
	id: joi.string().required(),
	internal__status: joi.string().required().valid('UNSEEN', 'SEEN'),
})

export async function PUT(request: Request) {
	const start = performance.now()
	const { error: userError } = await getCurrentUser()
	if (userError) {
		void logger.logError({
			message: 'PUT failed - Error getting user' + JSON.stringify(userError),
			error_code: 'E001',
			exception_type: 'Error',
		})
		return failResponse('Trouble getting user')
	}

	const requestData = await request.json()

	const { error: validationError } = schema.validate(requestData)

	if (validationError) {
		void logger.logError({
			message:
				'PUT failed - Error validating request data' + validationError.message,
			error_code: 'E001',
			exception_type: 'Error',
		})
		return failResponse(validationError.message)
	}

	const { error } = await supabase
		.from('contact_form')
		.update({
			internal__status: requestData.internal__status,
		})
		.match({ id: requestData.id })

	if (error) {
		void logger.logError({
			message: 'PUT failed - Error updating document' + error.message,
			error_code: 'E001',
			exception_type: 'Error',
		})
		return failResponse(error?.message)
	}

	const end = performance.now()
	void logger.logPerformance({
		message: 'PUT executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0.1/document/form-submission/internal-status',
		http_method: 'PUT',
	})
	return okResponse(
		requestData.internal__status,
		'Form submission internal status updated',
	)
}
