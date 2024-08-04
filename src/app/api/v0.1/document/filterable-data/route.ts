import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

const validateIncomingData = (requestData: any) => {
	const schema = joi.object({
		id: joi.string().required(),
		category_id: joi.string().allow('').optional(),
	})
	const { error: validationError } = schema.validate(requestData)
	if (validationError) {
		return validationError.message
	}

	return null
}

export async function POST(request: Request) {
	const { error: userError } = await getCurrentUser()
	if (userError) {
		return failResponse('Trouble getting user')
	}

	const requestData = await request.json()
	const validationError = validateIncomingData(requestData)
	if (validationError) {
		return failResponse(validationError)
	}

	if (requestData.category_id) {
		const { error: postError } = await supabase
			.from('posts')
			.update({
				category_id: requestData.category_id,
				last_updated: new Date(),
			})
			.match({ id: requestData.id })

		if (postError) {
			return failResponse(postError?.message)
		}
	}

	return okResponse('Document updated')
}
