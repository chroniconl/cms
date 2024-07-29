import { colorClassNames } from '@/utils/colorClassNames'
import { formatSlug } from '@/utils/formatSlug'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'

export async function GET() {
	const loggerName = 'api.v0.categories.GET'
	const applicationName = 'chroniconl'
	const environment = process.env.NODE_ENV as string || 'development'
	const logger = new Logger(loggerName, applicationName, environment)

	const start = performance.now();

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color')

  if (error) {
		void logger.logError({
			message: 'GET failed - Error fetching categories' + error.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(error?.message)
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'GET executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0/categories',
		http_method: 'GET'
	});
  return okResponse(data)
}

export async function POST(request: Request) {
	const loggerName = 'api.v0.categories.POST'
	const applicationName = 'chroniconl'
	const environment = process.env.NODE_ENV as string || 'development'
	const logger = new Logger(loggerName, applicationName, environment)

	const start = performance.now();
  const requestData = await request.json()

  const schema = joi.object({
    name: joi.string().required(),
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

  const colorValues = Object.keys(colorClassNames)
  const randomColor: string =
    colorValues[Math.floor(Math.random() * colorValues.length)]

  const { data, error } = await supabase
    .from('categories')
    .insert([
      {
        name: requestData.name,
        slug: formatSlug(requestData.name),
        color: randomColor,
      },
    ])
    .select('id, name, slug, color')
    .single()

  if (error) {
		void logger.logError({
			message: 'POST failed - Error creating category' + error.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(error?.message)
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'POST executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0/categories',
		http_method: 'POST'
	});
  return okResponse(data, 'Document category created')
}

export async function PUT(request: Request) {
	const loggerName = 'api.v0.categories.PUT'
	const applicationName = 'chroniconl'
	const environment = process.env.NODE_ENV as string || 'development'
	const logger = new Logger(loggerName, applicationName, environment)

	const start = performance.now();
  const requestData = await request.json()

  const schema = joi.object({
    id: joi.string().required(),
    category_id: joi.string().required(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
		void logger.logError({
			message: 'PUT failed - Error validating request data' + validationError.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('categories')
    .update({
      category_id: requestData.category_id,
    })
    .match({ id: requestData.id })

  if (error) {
		void logger.logError({
			message: 'PUT failed - Error updating category' + error.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(error?.message)
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'PUT executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0/categories',
		http_method: 'PUT'
	});
  return okResponse('Documents category was updated')
}
