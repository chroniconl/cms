'use client'
import PostCard from './PostCard'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function PostsList({ data, records }: { data: any, records: number }) {
	const router = useRouter()


	if (!data) {
		return null
	}

	const handleLoadMore = async () => {
		router.push(`/dashboard/posts?records=${records + 10}`)
	}

	return (
		<div>
			<div className="grid gap-5">
				{/* @ts-ignore */}
				{data &&
					data?.data?.map((doc: {
						id: string
						title: string
						created_at: string
						content: string
						publish_date_time: string
						slug: string
						tags: string
						category: any
						visibility: string
						description: string
						publish_date_day: Date
						user_id: string
						image_url: string
						image_alt: string
						image_caption: string
						image_id: string
						author: any
					}) => (
						<PostCard
							key={doc.id}
							title={doc.title}
							date={doc.created_at}
							slug={`/dashboard/posts/${doc.slug}`}
							category={doc.category}
							imageAlt={doc.image_alt}
							imageUrl={doc.image_url}
							description={doc.description}
							publishDate={new Date(doc.publish_date_day).toISOString()}
						/>
					))}
				<div className="mb-12 mt-6">
					<Button onClick={handleLoadMore}>Load More</Button>
				</div>
			</div>
		</div>
	)
}
