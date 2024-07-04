'use client'
import PostCard from './PostCard'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { SafePost } from '@/utils/types'
import { Text } from '@/components/ui/text'

export default function PostsList({ data, records }: {
	data: {
		count: number
		current: number
		next: number,
		clientSafeData: SafePost[]
	},
	records: number
}) {
	const router = useRouter()

	if (!data) {
		return null
	}

	const handleLoadMore = async () => {
		router.push(`/dashboard/posts?records=${records + 10}`)
	}

	return (
		<section className="grid grid-cols-12 gap-2">
			<Card className="col-span-12 mb-16 space-y-4 px-4 gap-4 divide-y divide-stone-200/50 dark:divide-stone-700/50">
				<div className="w-full pt-4">
					<Text small>
						Showing {records} of {data?.count} posts
					</Text>
				</div>
				{data?.clientSafeData?.map((post: SafePost) => (
					<PostCard
						key={post.id}
						{...post}
					/>
				))}
			</Card>
			<div className="col-span-12 mb-12 mt-6">
				<Button onClick={handleLoadMore}>Load More</Button>
			</div>
		</section>

	)
}
