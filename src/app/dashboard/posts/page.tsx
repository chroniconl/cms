import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import NewDocumentButton from './_posts_components/NewDocumentButton'
import CategoryFilterOptionOnServer from './_posts_components/CategoryFilterOption.server'
import { getPostsAction } from './_posts_utils/getPostsAction'
import PostsList from './_posts_components/PostsList'
import { VisibilityOption } from './_posts_components/VisibilityOption'
import { DateRageOptions } from './_posts_components/DateRageOptions'
import { Card } from '@/components/ui/card'
import AuthorsFilterOption from './_posts_components/AuthorsFilterOption'
import TagsFilterOptionOnServer from './_posts_components/TagsFilterOption.server'

const DEFAULT_RECORDS = 10;
export default async function PostsPage({ searchParams }: { searchParams: { records: string } }) {
	// try to parse the page number from the URL
	const searchParamsRecords = parseInt(searchParams.records as string) || DEFAULT_RECORDS
	const records = searchParamsRecords > 0 ? searchParamsRecords : DEFAULT_RECORDS

	const data = await getPostsAction(records)

	if (!data) {
		return <div>Error fetching posts</div>
	}
	return (
		<>
			<section className="mb-5 grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-6">
					<Heading>Your Posts</Heading>
					<Text>
						Here you can view all the posts you have created and manage their
						settings.
					</Text>
				</div>
				<div className="col-span-12 flex gap-2 md:col-span-6 md:justify-end">
					<NewDocumentButton url={process.env.NEXT_PUBLIC_SITE_URL as string} />
				</div>
			</section>
			<main className="grid grid-cols-12 gap-4">
				<section className="col-span-12 md:col-span-8">
					<PostsList
						data={data}
						records={records}
					/>
				</section>
				<section className="hidden md:col-span-4 md:block">
					<Card className="mb-16 space-y-4 p-4 gap-4">
						<AuthorsFilterOption />
						<VisibilityOption />
						<DateRageOptions />
						<CategoryFilterOptionOnServer />
						<TagsFilterOptionOnServer />
					</Card>
				</section>
			</main>
		</>
	)
}
