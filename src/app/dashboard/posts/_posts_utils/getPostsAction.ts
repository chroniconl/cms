import { getPSTDate, isPublished } from '@/utils/dates';
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug';
import { supabase } from '@/utils/supabase'
import { currentUser } from '@clerk/nextjs/server'
import { SafePost } from '@/utils/types';
const START = 0;

export const getPostsAction = async (
	records: number = 10,
	sort: {
		value: string
		ascending: boolean
		visibility?: string
	} = {
			value: 'created_at',
			ascending: false
		},
) => {
	const user = await currentUser()
	const { data: userData, error: userError } = await supabase
		.from('users')
		.select('*')
		.eq('user_id', user?.id)
		.single()

	if (userError) {
		return
	}

	let data, error, count
	/**
	 * Apply the visibility filter if it exists
	 * Otherwise, apply the default sort and filter 
	*/
	if (sort?.visibility) {
		const { data: tempData, error: tempError, count: tempCount } = await supabase
			.from('posts')
			.select(`
				*, 
				category:categories(id, name, slug, color),
				author:authors(id, display_name, href, avatar_url, twitter_handle)
			`, { count: 'exact' })
			.order(sort.value, { ascending: sort.ascending })
			.eq('visibility', sort.visibility)
			.eq('user_id', userData?.id)
			.range(START, records)
			.limit(records)

		if (tempError) {
			return
		}

		/** 
		 * filter data that has no "publish_date_day" 
		 **/
		data = tempData.filter((post) => post.publish_date_day)
		count = tempCount
		error = tempError
	} else {
		const { data: tempData, error: tempError, count: tempCount } = await supabase
			.from('posts')
			.select(`
				*, 
				category:categories(id, name, slug, color),
				author:authors(id, display_name, href, avatar_url, twitter_handle)
			`, { count: 'exact' })
			.order(sort.value, { ascending: sort.ascending })
			.eq('user_id', userData?.id)
			.range(START, records)
			.limit(records)

		if (tempError) {
			return
		}

		data = tempData
		count = tempCount
		error = tempError
	}

	if (error) {
		return
	}

	// map over the data to get the tags
	const dataWithTags = await Promise.all(
		data.map(async (curr) => {
			const { data: tagsData, error: tagsError } = await supabase
				.from('post_tag_relationship')
				.select('tag:tags(id, name, slug)')
				.eq('post_id', curr.id)

			if (tagsError) {
				return
			}

			return {
				...curr,
				tags: tagsData.map((tag) => tag.tag),
			}
		}),
	)

	const clientSafeData: SafePost[] = dataWithTags.map((post) => {
		return {
			id: post.id,
			title: post.title,
			createdAt: post.created_at,
			content: post.content,
			slug: {
				base: post.slug,
				public: `${formatTimestampToSlug(post.publish_date_day)}/${post.slug}`,
				share: `${process.env.NEXT_PUBLIC_SITE_URL}/${formatTimestampToSlug(post.publish_date_day)}/${post.slug}/share`
			},
			visibility: post.visibility,
			description: post.description,
			publishDateTime: post.publish_date_time,
			publishDateDay: post.publish_date_day,
			formattedPublishDate: getPSTDate(`${post.publish_date_day}T${post.publish_date_time}` as any as Date),
			isPublished: isPublished(`${post.publish_date_day}T${post.publish_date_time}` as any as Date),
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
				twitterHandle: post.author?.twitter_handle
			},
			category: {
				id: post.category?.id,
				name: post.category?.name,
				slug: post.category?.slug,
				color: post.category?.color
			},
			tags: post.tags
		}
	})

	return {
		data: data,
		count: count as number,
		next: records + 10,
		current: records,
		clientSafeData: clientSafeData
	}
}
