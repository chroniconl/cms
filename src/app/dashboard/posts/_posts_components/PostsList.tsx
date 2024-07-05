'use client'
import PostCard from './PostCard'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { SafePost } from '@/utils/types'
import { Text } from '@/components/ui/text'
import { SortOptions } from './SortOptions'
import { validateSort } from '../_posts_utils/validateSort'

export default function PostsList({
	data,
	sort = { value: 'default', ascending: false, formValue: 'default' },
}: {
	data: {
		count: number
		current: number
		next: number,
		clientSafeData: SafePost[]
	},
	sort: {
		value: string
		ascending: boolean
		visibility?: string
		formValue: string
	}
}) {
	const router = useRouter()

	if (!data) {
		return null
	}

	const updateQueryParams = (newParams: any) => {
		const searchParams = new URLSearchParams(window.location.search)
		Object.entries(newParams).forEach(([key, value]) => {
			if (value) {
				searchParams.set(key, value as string)
			} else {
				searchParams.delete(key)
			}
		})
		return searchParams.toString()
	}

	const handleLoadMore = async () => {
		const newQueryParams = updateQueryParams({ records: data?.clientSafeData?.length + 10 })
		router.push(`/dashboard/posts?${newQueryParams}`)
	}

	const handleSort = (value: string) => {
		value = validateSort(value)
		const newQueryParams = updateQueryParams({ sort: value })
		router.push(`/dashboard/posts?${newQueryParams}`)
	}

	return (
		<section className="grid grid-cols-12 gap-2">
			<Card className="col-span-12 mb-16 space-y-4 px-4 gap-4 divide-y divide-stone-200/50 dark:divide-stone-700/50">
				<div className="w-full pt-4 flex items-center justify-between">
					<Text small>
						Showing {data?.clientSafeData?.length} of {data?.count} posts
					</Text>

					<div>
						<SortOptions
							defaultValue={validateSort(sort?.formValue)}
							onValueChange={handleSort}
						/>
					</div>
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