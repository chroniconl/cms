import { supabase } from '@/utils/supabase'
import CategoryFilterOption from './CategoryFilterOption'

export default async function CategoryFilterOptionOnServer() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color')

  if (error) {
    return <div>Error fetching categories</div>
  }

  return <CategoryFilterOption categories={data} />
}
