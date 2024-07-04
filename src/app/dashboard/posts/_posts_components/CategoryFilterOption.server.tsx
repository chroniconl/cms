import { supabase } from '@/utils/supabase'
import CategoryFilterOption from './CategoryFilterOption'

export default async function CategoryFilterOptionOnServer() {
	const { data, error } = await supabase
		.from('categories')
		.select('id, name, slug, color')

	if (error) {
		throw Error("Error fetching categories")
	}

	return <CategoryFilterOption categories={data} />
}
