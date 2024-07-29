import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = process.env.NODE_ENV as string || 'development'
const logger = new Logger(loggerName, applicationName, environment)


export async function POST(request: Request) {
	const start = performance.now();
  const requestData = await request.json()

  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    message: joi.string().required(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
		void logger.logError({
			message: 'POST failed - Error validating request data' + validationError.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('contact_form').insert({
    name: requestData?.name,
    email: requestData?.email,
    phone: requestData?.phone,
    message: requestData?.message,
  })

  if (error) {
		void logger.logError({
			message: 'POST failed - Error submitting contact form' + error.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse('Error submitting contact form')
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'POST executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0/document/image-metadata',
		http_method: 'POST'
	});
  return okResponse('Contact form submitted')
}
