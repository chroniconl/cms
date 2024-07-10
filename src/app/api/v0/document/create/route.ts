import { getCurrentUser } from '@/server/getCurrentUser';
import { formatSlug } from '@/utils/formatSlug'
import {
	bypassOkResponse,
	failResponse,
	okResponse,
	skirtFailedResponse,
} from '@/utils/response'
import { supabase } from '@/utils/supabase'

async function createDocumentWithTitle(title: string): Promise<any> {
	try {
		const { data: userData, error: userError } = await getCurrentUser();
		if (userError) {
			return failResponse('Trouble getting user')
		}

		const { data, error } = await supabase
			.from('posts')
			.insert({
				title: title,
				content: '<p>Nothing here yet</p>',
				slug: formatSlug(title),
				user_id: userData?.id,
			})
			.select()

		if (error) {
			if (error.code === '23505') {
				return skirtFailedResponse('Document with that title already exists')
			}

			return skirtFailedResponse('Failed to create document')
		}
		return bypassOkResponse(data[0].slug)
	} catch (error) {
		return skirtFailedResponse('Failed to create document')
	}
}

export async function POST(request: Request) {
	const data = await request.json()

	const responseObject = await createDocumentWithTitle(data.title)

	if (responseObject?.error === true) {
		return failResponse(responseObject.message)
	}

	return okResponse(responseObject.data)
}
