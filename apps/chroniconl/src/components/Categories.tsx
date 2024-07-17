import Link from 'next/link'
import { ScrollArea } from '@repo/ui/scroll-area'
import { supabase } from '@/utils/supabase'
import { Category } from '@/utils/types'
import { ChButtonSecondary } from '@repo/ui/button'

export async function Categories() {
  // TODO Get Categories with most published posts
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name, slug, color')
    .limit(5)

  if (categoriesError) {
    throw Error()
  }

  return (
    <div className="rounded-md bg-secondary p-4 shadow-md">
      <h3 className="pb-4 text-lg font-bold">Categories</h3>
      <ul className="space-y-1">
        {categories?.map((category: Category) => (
          <li key={category.id}>
            <Link
              href={`/dashboard/posts/${category.slug}`}
              className="block rounded-md border border-stone-200 px-3.5 py-2.5 hover:bg-stone-200 dark:border-stone-700 dark:hover:bg-stone-700"
              prefetch={false}
            >
              {category.name}
            </Link>
          </li>
        ))}
        <li className="mt-2 flex w-full items-center justify-center hover:underline">
          <ChButtonSecondary className="w-fit py-2.5">View all categories</ChButtonSecondary>
        </li>
      </ul>
    </div>
  )
}
