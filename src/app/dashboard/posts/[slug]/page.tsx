export const fetchCache = 'force-no-store'

import { supabase } from '@/utils/supabase'
import Link from 'next/link'
import DeleteDocumentButton from './_slug_components/DeleteDocumentButton'
import Post from '@/components/Post'

export default async function DocumentsSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  if (!params.slug) {
    return <>Error fetching post</>
  }

  const { data, error } = await supabase
    .from('posts')
    .select(
      '*, category:categories(id, name, slug, color), author:authors(id, display_name, href, avatar_url, twitter_handle)',
    )
    .eq('slug', params.slug)
    .single()

  if (error) {
    return <>Error fetching post</>
  }

  return (
    <div>
      <div className="flex justify-end gap-2">
        <DeleteDocumentButton id={data.id} />
        <Link
          prefetch={false}
          href={`/dashboard/posts/${data.slug}/edit`}
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Edit
        </Link>
      </div>

      <Post
        // @ts-ignore
        title={data.title}
        // @ts-ignore
        date={data.publish_date_day}
        // @ts-ignore
        slug={data.slug}
        // @ts-ignore
        category={data.category}
        // @ts-ignore
        description={data.description}
        // @ts-ignore
        content={data.content}
        imageAlt={data.image_alt}
        imageUrl={data.image_url}
        author={data.author as any}
      />
    </div>
  )
}
