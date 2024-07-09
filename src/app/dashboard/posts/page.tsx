import { Text } from '@/components/text'
import { Heading } from '@/components/heading'
import NewDocumentButton from './_posts_components/NewDocumentButton'
import { getPostsAction } from './_posts_utils/getPostsAction'
import PostsList from './_posts_components/PostsList'
import { sortParamsToSupabaseQuery, validateSort } from './_posts_utils/validateSort'

const DEFAULT_RECORDS = 0;
export default async function PostsPage({ searchParams }: {
	searchParams: {
		records: string
		sort: string
		visibility: string
	}
}) {
	// try to parse the page number from the URL
	const searchParamsRecords = parseInt(searchParams.records as string) || DEFAULT_RECORDS
	const records = searchParamsRecords > 0 ? searchParamsRecords : DEFAULT_RECORDS
	const sort = sortParamsToSupabaseQuery(validateSort(searchParams.sort as string))
	const data = await getPostsAction(records === 0 ? 10 : records, sort)

	if (!data) {
		throw new Error("Error fetching posts")
	}

	return (
		<>
			<section className="mb-5 grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-6">
					<Heading className='mb-2'>Your Posts</Heading>
					<Text>
						Here you can view all the posts you have created and manage their
						settings.
					</Text>
				</div>
				<div className="col-span-12 flex gap-2 md:col-span-6 md:justify-end">
					<NewDocumentButton />
				</div>
			</section>
			<div className="grid grid-cols-12 gap-4">
				<section className="col-span-12">
					{/* 
						We're sending the `sort` data to the server 
						to be used in the query params.
					*/}
					<PostsList
						data={data}
						sort={sort}
					/>
				</section>
			</div>
		</>
	)
}
