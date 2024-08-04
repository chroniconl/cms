import { format } from 'date-fns'
import PublicLayout from '@/components/PublicLayout'
import ViewBy from '@/components/ViewBy'
import { getPSTDate } from '@/utils/dates'
import { removePostsThatWillBePublishedLaterToday } from '@/utils/removePostsThatWillBePublishedLaterToday'
import { supabase } from '@/utils/supabase'

export default async function Page() {
	const pstDate = getPSTDate()
	const formattedPSTDate = format(pstDate, 'yyyy-MM-dd')

	const { data: categoriesData, error: categoriesError } = await supabase
		.from('categories')
		.select('id, name, slug, color')

	if (categoriesError) {
		throw Error()
	}

	// Map over the categories to get the posts
	const categoriesWithPosts = await Promise.all(
		categoriesData.map(async (curr) => {
			const { data: postsData, error: postsError } = await supabase
				.from('posts')
				.select('*', { count: 'exact' })
				.order('publish_date_day', { ascending: false })
				.lte('publish_date_day', formattedPSTDate)
				.eq('visibility', 'public')
				.eq('category_id', curr.id)

			if (postsError) {
				throw new Error(postsError.message)
			}

			// filter out posts based on publish_date_time
			const filterPosts = removePostsThatWillBePublishedLaterToday(postsData)

			if (filterPosts.length === 0) {
				return
			}

			return {
				[curr.name]: {
					count: filterPosts.length,
					...curr,
				},
			}
		}),
	)
	// Filter out null values
	const validCategoriesWithPosts = categoriesWithPosts.filter(
		(item) => item !== null,
	)

	// Reduce to a single object
	const categorizedPosts = validCategoriesWithPosts.reduce((acc, curr) => {
		return {
			...acc,
			...curr,
		}
	}, {})

	return (
		<PublicLayout>
			<div className="mx-auto max-w-7xl px-2 md:mt-10 md:px-4">
				<ViewBy data={categorizedPosts} />
			</div>
		</PublicLayout>
	)
}
