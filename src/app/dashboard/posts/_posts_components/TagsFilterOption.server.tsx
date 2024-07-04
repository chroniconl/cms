import { supabase } from '@/utils/supabase'
import TagsFilterOption from './TagsFilterOption'

export default async function TagsFilterOptionOnServer() {
	const { data, error } = await supabase
		.from('tags')
		.select('id, name, slug')

	if (error) {
		throw Error("Error fetching categories")
	}

	return <TagsFilterOption data={data} />
}
