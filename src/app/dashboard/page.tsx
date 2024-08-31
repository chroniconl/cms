export const fetchCache = 'force-no-store'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import {
  formatDate,
  getPSTDate,
  getPSTDaySevenDaysFromNow,
} from '@/utils/dates'
import { supabase } from '@/utils/supabase'
import Link from 'next/link'
import UploadThingStorageSizePieChart from './_dashboard_components/UploadThingStorageSizePieChart'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  format,
  formatDistanceToNow,
  isWithinInterval,
  addHours,
} from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Text } from '@/components/text'
import { Badge } from '@/components/ui/badge'
import { ClockIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import UnseenFormSubmissionCard from './_dashboard_components/UnseenFormSubmissionCard'

async function ComingSoon() {
  const pstDate = getPSTDate()
  const pstDateSevenDaysFromNow = getPSTDaySevenDaysFromNow()

  const formattedPSTDate = format(pstDate, 'yyyy-MM-dd')
  const formattedPSTDateSevenDaysFromNow = format(
    pstDateSevenDaysFromNow,
    'yyyy-MM-dd',
  )

  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(id, name, slug, color)')
    .eq('visibility', 'public')
    .gte('publish_date_day', formattedPSTDate)
    .lte('publish_date_day', formattedPSTDateSevenDaysFromNow)
    .order('publish_date_day', { ascending: true })
    .limit(6)

  if (error) {
    throw Error()
  }

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Upcoming Posts</CardTitle>
        <CardDescription>
          Here's what you've got scheduled for the next 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Info</TableHead>
              <TableHead className="hidden md:table-cell">
                Publish Date (Go Live)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length ? (
              data.map((post) => {
                const publishDate = getPSTDate(
                  `${post.publish_date_day}T${post.publish_date_time}` as any as Date,
                )
                const isWithin24Hours = isWithinInterval(publishDate, {
                  start: pstDate,
                  end: addHours(pstDate, 24),
                })

                return (
                  <TableRow
                    key={post.id}
                    className={cn(
                      isWithin24Hours
                        ? 'bg-yellow-50 dark:bg-yellow-800/10'
                        : 'bg-transparent hover:bg-stone-50 dark:hover:bg-stone-800/10',
                    )}
                  >
                    <TableCell>
                      <Link
                        className="inline-flex w-full flex-col items-start space-y-2 font-medium md:flex-row md:space-x-2 md:space-y-0"
                        href={`/dashboard/posts/${post.slug}`}
                      >
                        <div className="items-top flex w-full justify-between md:w-fit">
                          <img
                            className="h-12 w-12"
                            // @ts-ignore
                            src={post.image_url}
                            // @ts-ignore
                            alt={post.image_alt}
                          />
                          <div className="block md:hidden">
                            <Text>
                              Goes live in{' '}
                              {formatDistanceToNow(publishDate, {
                                locale: enUS,
                              })}{' '}
                            </Text>
                          </div>
                        </div>
                        <div>
                          <Text className="mb-2 font-bold">{post.title}</Text>
                          {post.category?.name && (
                            <Badge variant={post.category?.color}>
                              {post.category?.name}
                            </Badge>
                          )}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        {formatDistanceToNow(publishDate, { locale: enUS })}
                        {isWithin24Hours && (
                          <ClockIcon className="ml-2 h-5 w-5 animate-pulse text-yellow-500" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  No posts scheduled for the next 7 days
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

async function DraftPosts() {
  const { data, error, count } = await supabase
    .from('posts')
    .select('*, category:categories(id, name, slug, color)', { count: 'exact' })
    .eq('visibility', 'draft')
    .order('publish_date_day', { ascending: false })
    .limit(10)

  if (error) {
    throw Error()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Draft Posts</CardTitle>
        <CardDescription>
          These are posts that are currently in the draft stage.{' '}
          {count && count > 0 && (
            <span className="text-sm text-muted-foreground">
              {count} draft posts
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-12">
              <TableHead className="col-span-8">Title</TableHead>
              <TableHead className="col-span-4 text-right">
                Publish Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length ? (
              data.map((post) => (
                <TableRow
                  key={post.id}
                  className="grid grid-cols-12 hover:bg-stone-50 dark:hover:bg-stone-800"
                >
                  <TableCell className="col-span-8 overflow-hidden text-ellipsis text-nowrap">
                    <Link
                      className="text-sm font-medium"
                      href={`/dashboard/posts/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="col-span-4 text-right">
                    {/* @ts-ignore */}
                    {formatDate(post.publish_date_day)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No draft posts available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const fetchUploadThingStorageSize = async () => {
  const response = await fetch('https://api.uploadthing.com/v6/getUsageInfo', {
    method: 'POST',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
      'X-Uploadthing-Api-Key': process.env.UPLOADTHING_SECRET,
      'X-Uploadthing-Version': '6.4.0',
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch media')
  }

  const data = await response.json()
  return data
}

export default async function DashboardPage() {
  let data = await fetchUploadThingStorageSize()
  data = data as {
    totalBytes: number
    appTotalBytes: number
    filesUploaded: number
    limitBytes: number
  }

  const { count: formSubmissionsCount, error: formSubmissionsError } =
    await supabase
      .from('contact_form')
      .select('*', { count: 'exact' })
      .eq('internal__status', 'UNSEEN')

  if (formSubmissionsError) {
    throw new Error('Error fetching form submissions')
  }

  return (
    <section>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <UploadThingStorageSizePieChart
            data={{
              totalBytes: data.totalBytes,
              limitBytes: data.limitBytes,
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-8">
          <ComingSoon />
        </div>
        <div className="col-span-12 md:col-span-6">
          <DraftPosts />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UnseenFormSubmissionCard
            count={(formSubmissionsCount as number) || 0}
          />
        </div>
      </div>
    </section>
  )
}
