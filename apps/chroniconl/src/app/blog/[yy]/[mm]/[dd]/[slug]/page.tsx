import { supabase } from '@/utils/supabase'
import Post from '@/components/Post'
import { getPSTDate } from '@/utils/dates'
import { format } from 'date-fns'
import PublicLayout from '@/components/PublicLayout'
import type { Metadata, ResolvingMetadata } from 'next'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

type Props = {
  params: { yy: string; mm: string; dd: string; slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params

  // Fetch data from Supabase
  const { data, error } = await supabase
    .from('posts')
    .select('*, author:authors(id, display_name, href)')
    .eq('visibility', 'public')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return {
      title: 'Error',
      description: 'An error occurred while fetching the post data.',
    }
  }

  // Access and extend parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      type: 'article',
      url: `https://chroniconl.com/blog/${formatTimestampToSlug(
        data.publish_date_day,
      )}/${slug}`,
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.image_url,
          width: 800,
          height: 600,
          alt: data.image_alt,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.image_url],
      site: '@repo_src',
      creator: data.author_twitter_handle,
    },
    alternates: {
      canonical: `https://chroniconl.com/blog/${formatTimestampToSlug(
        data.publish_date_day,
      )}/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [
      {
        name: data.author_name,
        url: 'https://chroniconl.com/about',
      },
    ],
  }
}

export default async function BlogPage({
  params,
}: {
  params: {
    yy: string
    mm: string
    dd: string
    slug: string
  }
}) {
  const start = performance.now()
  let safeDate: string | null = null

  const { yy, mm, dd, slug } = params
  try {
    const year: number = parseInt(yy, 10)
    const month: number = parseInt(mm, 10) - 1 // Correct zero-indexing by subtracting 1
    const day: number = parseInt(dd, 10)

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      throw new Error('Something went wrong, please try again later')
    }

    const date = new Date(year, month, day)
    safeDate = format(date, 'yyyy-MM-dd')
  } catch (error) {
    void logger.logError({
      message: 'GET failed - Error formatting date',
      error_code: 'E001',
      exception_type: 'Error',
    })
    throw new Error('Something went wrong, please try again later')
  }

  if (!safeDate) {
    void logger.logError({
      message: 'GET failed - Error formatting date',
      error_code: 'E001',
      exception_type: 'Error',
    })
    throw new Error('Something went wrong, please try again later')
  }

  const pstDate = getPSTDate()
  const formattedPSTDate = format(pstDate, 'yyyy-MM-dd')
  const formattedPSTTime = format(pstDate, 'HH:mm:ss')

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
			title, 
			description, 
			content, 
			publish_date_day, 
			publish_date_time, 
			slug,
			category:categories(id, name, slug, color), 
			visibility, 
			description, 
			publish_date_day, 
			user_id, 
			image_url, 
			image_alt, 
			image_caption, 
			image_id, 
			author:authors(id, display_name, href, avatar_url, twitter_handle)
		`,
    )
    .eq('visibility', 'public')
    .eq('slug', slug)
    .lte('publish_date_day', formattedPSTDate)
    .single()

  if (error) {
    void logger.logError({
      message: 'GET failed - Error fetching post' + error.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    throw new Error('Something went wrong, please try again later')
  }

  const postGotPublishedToday = data.publish_date_day === formattedPSTDate

  // Can't show a post that is going live in a few hours..
  const postGotPublishedTodayWithinTime =
    data.publish_date_time > formattedPSTTime
  if (postGotPublishedToday && postGotPublishedTodayWithinTime) {
    throw new Error('Something went wrong, please try again later')
  }

  const end = performance.now()
  void logger.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/document/image-upload',
    http_method: 'GET',
  })

  return (
    <PublicLayout>
      <div className="mx-auto w-full md:max-w-3xl">
        <Post
          title={data?.title}
          date={data?.publish_date_day}
          slug={data?.slug}
          category={data.category as any}
          description={data?.description}
          content={data?.content}
          imageUrl={data?.image_url}
          imageAlt={data?.image_alt}
          author={data.author as any}
        />
      </div>
    </PublicLayout>
  )
}
