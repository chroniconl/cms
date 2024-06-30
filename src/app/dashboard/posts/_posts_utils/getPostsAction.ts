import { supabase } from '@/utils/supabase'
import { currentUser } from '@clerk/nextjs/server'

export const getPostsAction = async (
	records: number = 10,
) => {
	const START = 0;
	const user = await currentUser()
	const { data: userData, error: userError } = await supabase
		.from('users')
		.select('*')
		.eq('user_id', user?.id)
		.single()

	if (userError) {
		return
	}

	const { data, error, count } = await supabase
		.from('posts')
		.select(`*, category:categories(id, name, slug, color)`, { count: 'exact' })
		.order('created_at', { ascending: false })
		.eq('user_id', userData?.id)
		.range(START, records)
		.limit(records)

	if (error) {
		return
	}

	return {
		data,
		count: count as number,
		next: records + 10,
		current: records,
	}
}
