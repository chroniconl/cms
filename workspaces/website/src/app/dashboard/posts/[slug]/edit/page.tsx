import React from 'react'

export const fetchCache = 'force-no-store'

import MetaForm from './_edit_components/MetaFormV2'
import ImageForm from './_edit_components/ImageForm'
import PublishDetailsForm from './_edit_components/PublishDetailsForm'
import FilterDataForm from './_edit_components/FilterDataForm'
import TipTap from '@/components/general/TipTap'
import { Card } from '@/components/ui/card'
import { supabase } from '@/utils/supabase'
import { getPSTDate } from '@/utils/dates'

export default async function DocumentSlugEdit({
	params,
}: {
	params: {
		slug: string
	}
}) {
	try {
		const [postResult, categoriesResult, authorsResult] = await Promise.all([
			supabase
				.from('posts')
				.select(`*, category:categories(id, name, slug, color)`)
				.eq('slug', params.slug)
				.single(),
			supabase.from('categories').select(`*`),
			supabase.from('authors').select(`*`),
		])

		const { data: postData, error: postError } = postResult
		const { data: categoriesData, error: categoriesError } = categoriesResult
		const { data: authorsData, error: authorsError } = authorsResult

		if (postError) {
			throw new Error('Error fetching post')
		}

		if (categoriesError) {
			throw new Error('Error fetching categories')
		}

		if (authorsError) {
			throw new Error('Error fetching authors')
		}

		const { data: tagsData, error: tagsError } = await supabase
			.from('post_tag_relationship')
			.select(`tag:tags(id, name, slug)`)
			.eq('post_id', postData.id)

		if (tagsError) {
			throw new Error('Error fetching tags')
		}

		// TS will yell if I don't do this
		const tsSucksForThis = tagsData as any

		const formattedTags = tsSucksForThis.map(
			(tag: {
				tag: {
					id: string
					name: string
					slug: string
				}
			}) => ({
				name: tag.tag?.name,
				slug: tag.tag?.slug,
				id: tag.tag?.id,
			}),
		)

		// Use postData and categoriesData as needed
		return (
			<div className="grid w-full grid-cols-12 gap-4 rounded-md md:gap-6">
				<section className="prose col-span-12 flex max-w-full flex-col gap-1 dark:prose-invert md:col-span-8">
					<Card>
						<h2 className="mt-6 w-full px-4 text-2xl font-bold">
							{postData.title}
						</h2>
					</Card>
					<Card className="p-2">
						<TipTap defaultValue={postData.content} params={params} />
					</Card>
				</section>
				<section className="col-span-12 flex h-full flex-col gap-5 md:col-span-4">
					{/* pass as props cause server components */}
					<MetaForm
						id={postData.id}
						title={postData.title}
						description={postData.description}
						authors={authorsData}
						author_id={postData.author_id}
					/>
					<ImageForm
						id={postData.id}
						imageUrl={postData.image_url}
						imageId={postData.image_id}
						imageAlt={postData.image_alt}
						imageCaption={postData.image_caption}
					/>
					<PublishDetailsForm
						id={postData.id}
						publishDateDay={getPSTDate(new Date(postData?.publish_date_day))}
						publishDateTime={postData?.publish_date_time}
						visibility={postData.visibility}
					/>
					<FilterDataForm
						id={postData.id}
						categories={categoriesData}
						tags={formattedTags}
						category={postData.category}
					/>
				</section>
			</div>
		)
	} catch (error) {
		throw new Error('Error executing queries')
	}
}
