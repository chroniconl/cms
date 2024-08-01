export const fetchCache = 'force-no-store'

import React from 'react'
import MetaForm from './_edit_components/MetaFormV2'
import ImageForm from './_edit_components/ImageForm'
import PublishDetailsForm from './_edit_components/PublishDetailsForm'
import FilterDataForm from './_edit_components/FilterDataForm'
import TipTap, { proseClassNames } from '@/components/TipTap'
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

    // Use postData and categoriesData as needed
    return (
      <div className="grid w-full grid-cols-12 gap-2 rounded-md">
        <section className="col-span-12 flex max-w-full flex-col gap-2 md:col-span-8">
          <Card>
            <h2 className="ch-heading ch-primary my-6 px-4">
              {postData.title}
            </h2>
          </Card>
          <Card className="p-2">
            <TipTap
              defaultValue={postData.content}
              params={params}
              className={proseClassNames}
            />
          </Card>
        </section>
        <section className="col-span-12 flex h-full flex-col gap-2 md:col-span-4">
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
            publishDateDay={getPSTDate(postData?.publish_date_day)}
            publishDateTime={postData?.publish_date_time}
            visibility={postData.visibility}
          />
          <FilterDataForm
            id={postData.id}
            categories={categoriesData}
            category={postData.category}
          />
        </section>
      </div>
    )
  } catch (error) {
    throw new Error('Error executing queries')
  }
}
