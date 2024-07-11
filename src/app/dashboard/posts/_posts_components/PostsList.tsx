'use client'
import PostCard from './PostCard'
import { Button } from '@chroniconl/ui/button'
import { useRouter } from 'next/navigation'
import { Card } from '@chroniconl/ui/card'
import { SafePost } from '@/utils/types'
import { Text } from '@/components/text'
import { SortOptions } from './SortOptions'
import { validateSort } from '../_posts_utils/validateSort'
import { updateQuerySearchParams } from '@/utils/updateQuerySearchParams'

interface PostsListProps {
  data: {
    count: number
    current: number
    next: number
    clientSafeData: SafePost[]
  }
  sort: {
    value: string
    ascending: boolean
    visibility?: string
    formValue: string
  }
}

export default function PostsList({
  data,
  sort = { value: 'default', ascending: false, formValue: 'default' },
}: PostsListProps) {
  const router = useRouter()

  if (!data) {
    throw Error('No data')
  }

  const handleLoadMore = async () => {
    const newQueryParams = updateQuerySearchParams({
      records: data?.clientSafeData?.length + 10,
    })
    router.push(`/dashboard/posts?${newQueryParams}`)
  }

  const handleSort = (value: string) => {
    value = validateSort(value)
    const newQueryParams = updateQuerySearchParams({ sort: value })
    router.push(`/dashboard/posts?${newQueryParams}`)
  }

  return (
    <section className="grid grid-cols-12 gap-2">
      <Card className="col-span-12 gap-4 space-y-4 divide-y divide-stone-200/50 px-4 dark:divide-stone-700/50">
        <div className="flex w-full items-center justify-between pt-4">
          <Text small>
            Showing {data?.clientSafeData?.length} of {data?.count} posts
          </Text>
          <SortOptions
            defaultValue={validateSort(sort?.formValue)}
            onValueChange={handleSort}
          />
        </div>
        {data?.clientSafeData?.map((post: SafePost) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Card>
      <div className="col-span-12 mb-12 mt-6">
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </section>
  )
}
