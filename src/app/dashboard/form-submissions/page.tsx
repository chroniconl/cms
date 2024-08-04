export const fetchCache = 'force-no-store'

import { supabase } from '@/utils/supabase'
import Messages from './__form-submissions_components/Messages'

export default async function Media() {
	const { data, error } = await supabase.from('contact_form').select('*')

	if (error) {
		throw new Error('Failed to fetch media')
	}

	const formattedData = data.map((message) => ({
		id: message.id,
		email: message.email,
		name: message.name,
		message: message.message,
		phone: message.phone,
		status: message.internal__status,
		date: message.created_at,
	}))

	return (
		<section>
			<Messages messages={formattedData} />
		</section>
	)
}
