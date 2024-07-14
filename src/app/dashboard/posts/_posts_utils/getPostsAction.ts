import { getPSTDateFormattedWithoutFallback, isPublished } from '@/utils/dates'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { supabase } from '@/utils/supabase'
import { SafePost } from '@/utils/types'
import { getCurrentUser } from '@/server/getCurrentUser'

export const getPostsAction = async () => {
	const userData = await getCurrentUser()

	// TODO: Make this a query
	// just f**king snatch it all and filter it later
	// Mat tried to do this in a query but made it too complicated
	const { data, error, count } = await supabase
		.from('posts')
		.select(`*, 
			category:categories(id, name, slug, color),
			author:authors(id, display_name, href, avatar_url, twitter_handle)`,
			{ count: 'exact' },
		)
		.eq('user_id', userData?.id)
		.order('created_at', { ascending: false })

	if (error) throw new Error('Error fetching posts')

	// map over the data to get the tags
	const dataWithTags = await Promise.all(
		data.map(async (curr) => {
			const { data: tagsData, error: tagsError } = await supabase
				.from('post_tag_relationship')
				.select('tag:tags(id, name, slug)')
				.eq('post_id', curr.id)

			if (tagsError) {
				throw new Error('Error fetching tags')
			}

			return {
				...curr,
				tags: tagsData.map((tag) => tag.tag),
			}
		}),
	)

	const findPublishableDate = (day: string | null, time: string | null): string | null => {
		switch (true) {
			case typeof day === 'string' && typeof time === 'string':
				return `${day}T${time}`
			case typeof day === 'string' && typeof time === 'object':
				return day
			case typeof day === 'object' && typeof time === 'string':
				return time
			default:
				return null
		}
	}
	const clientSafeData: SafePost[] = dataWithTags.map((post) => {
		let formatablePublishDate: string | null = null
		const publishDateDay = findPublishableDate(post.publish_date_day, post.publish_date_time)
		if (typeof publishDateDay === 'string') {
			// that sucks, srry
			formatablePublishDate = getPSTDateFormattedWithoutFallback(publishDateDay as any as Date)
		}

		return {
			id: post.id,
			title: post.title,
			createdAt: post.created_at,
			content: post.content,
			slug: {
				base: post.slug,
				public: `${formatTimestampToSlug(post.publish_date_day)}/${post.slug}`,
				share: `${process.env.NEXT_PUBLIC_SITE_URL}/${formatTimestampToSlug(post.publish_date_day)}/${post.slug}/share`,
			},
			visibility: post.visibility,
			description: post.description,
			publishDateTime: post.publish_date_time,
			publishDateDay: post.publish_date_day,
			formattedPublishDate: formatablePublishDate as string,
			isPublished: isPublished(
				`${post.publish_date_day}T${post.publish_date_time}` as any as Date,
			),
			userId: post.user_id,
			imageUrl: post.image_url,
			imageAlt: post.image_alt,
			imageCaption: post.image_caption,
			imageId: post.image_id,
			author: {
				id: post?.author_id,
				displayName: post.author?.display_name,
				href: post.author?.href,
				avatarUrl: post.author?.avatar_url,
				twitterHandle: post.author?.twitter_handle,
			},
			category: {
				id: post.category?.id,
				name: post.category?.name,
				slug: post.category?.slug,
				color: post.category?.color,
			},
			tags: post.tags,
		}
	})

	return {
		count: count as number,
		clientSafeData: clientSafeData,
	}
}
