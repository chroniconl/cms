import { getCurrentUser } from '@/server/getCurrentUser'
import { toPST } from '@/utils/dates'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.publish-details.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

interface PublishDetailsApiProps {
	id: string
	visibility?: string
	publishDateDay?: Date
	publishDateTime?: string
}

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

	const requestData = (await request.json()) as PublishDetailsApiProps

	const schema = joi.object({
		id: joi.string().required(),
		visibility: joi.string().optional(),
		publishDateDay: joi.date().optional(),
		publishDateTime: joi.string().optional(),
	})

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
		.from('posts')
		.update({
			visibility: requestData?.visibility || null,
			publish_date_day: requestData?.publishDateDay
				? toPST(requestData?.publishDateDay)
				: null,
			publish_date_time: requestData?.publishDateTime || null,
			last_updated: new Date(),
		})
		.match({ id: requestData?.id })

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
		url: '/api/v0.1/document/publish-details',
		http_method: 'PUT',
	})
	return okResponse('Document updated')
}
