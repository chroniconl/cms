export interface Category {
	id: string
	name: string
	color: string
	slug: string
}

export interface PostResponseTypes {
	error: boolean
	message: string
	data: any | null
}

export interface ServerPostType {
	id: string
	title: string
	created_at: Date
	content: string
	publish_date_time: string
	slug: string
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
}

export interface ClientPostType {
	title: string
	createdAt: Date
	content: string
	publishDateTime: string
	slug: string
	category: Category
	publishDateDay: Date
	userId: string
	imageUrl: string | null
	imageAlt: string | null
	description: string
	id: string
	author: any
	visibility: string
}

export type SafePost = {
	id: string
	title: string
	createdAt: Date
	content: string
	slug: {
		base: string
		public: string
		share: string
	}
	visibility: string
	description: string
	publishDateDay: string
	publishDateTime: Date
	isPublished: boolean
	formattedPublishDate: string
	userId: string
	imageUrl: string | null
	imageAlt: string | null
	imageCaption: string | null
	imageId: string | null
	author: {
		id: string
		displayName: string
		href: string
		avatarUrl: string
		twitterHandle: string
	}
	category: {
		id: string
		name: string
		slug: string
		color: string
	}
	tags: {
		id: string
		name: string
		slug: string
	}[]
}
