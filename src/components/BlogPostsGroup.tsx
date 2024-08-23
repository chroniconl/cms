'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/heading'
import { ClientImage } from '@/components/image'
import { Text } from '@/components/text'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { Category } from '@/utils/types'
import { cn } from '@/utils/cn'

interface Post {
  id: string
  title: string
  description: string
  content: string
  publish_date_day: string
  publish_date_time: string
  slug: string
  image_url: string
  image_alt: string
  category: Category
  author: {
    id: string
    display_name: string
    href: string
    avatar_url: string
    twitter_handle: string
  }
}
export default function BlogPostsGroup({
  posts,
  noImage = false,
  enableLazyScroll = false,
}: {
  limit?: number | undefined
  posts: Post[]
  noImage?: boolean
  enableLazyScroll?: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [lazyPosts, setLazyPosts] = useState<Post[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const limit = 6
  const observerTarget = useRef(null)

  // Initialize with the first set of posts
  useEffect(() => {
    if (!enableLazyScroll) return
    setLazyPosts(posts.slice(0, limit))
  }, [posts, enableLazyScroll, limit])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !loading) {
          setOffset((prevOffset) => prevOffset + limit)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loading])

  useEffect(() => {
    if (enableLazyScroll && offset > 0) {
      setLoading(true) // Start loading indicator

      setTimeout(() => {
        const nextPosts = posts.slice(offset, offset + limit)
        if (nextPosts.length < limit || offset >= posts.length) {
          setHasMore(false) // No more posts to load
        }

        setLazyPosts((prevPosts) => {
          const uniquePosts = nextPosts.filter(
            (newPost) => !prevPosts.some((post) => post.id === newPost.id),
          )
          return [...prevPosts, ...uniquePosts]
        })
        setLoading(false) // Stop loading indicator after delay
      }, 1500) // 1500ms delay
    }
  }, [offset, posts, enableLazyScroll])

  const feed = enableLazyScroll ? lazyPosts : posts
  return (
    <div>
      <section className="grid grid-cols-1 gap-4 px-4 md:mx-0 md:grid-cols-2 md:gap-8 md:px-0 lg:grid-cols-3">
        {feed?.map((post) => (
          <Link
            className="inline-block h-full"
            key={post.id}
            href={`/blog/${formatTimestampToSlug(post.publish_date_day)}/${
              post.slug
            }`}
          >
            <article
              key={post.id}
              className={cn([
                'group h-full',
                { 'ch-border-outline ch-card rounded-xl p-4': noImage },
              ])}
            >
              {noImage === false && (
                <ClientImage src={post.image_url} alt={post.image_alt} />
              )}
              <div
                className={cn([
                  'flex flex-col justify-between',
                  { 'mt-4': noImage === false },
                ])}
              >
                <div>
                  <Heading level={3}>{post.title}</Heading>
                  <Text className="mt-2">{post?.publish_date_day}</Text>
                  <Text className="mt-2">
                    {post?.description?.slice(0, 200)}
                  </Text>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <Badge variant={post.category?.color}>
                    {post.category?.name}
                  </Badge>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
      {enableLazyScroll && (
        <div className="my-10 flex w-full justify-center">
          <div ref={observerTarget}></div>
          {loading && hasMore && (
            <section className="flex w-full justify-center">
              <div className="h-[50px] w-[50px] animate-pulse rounded-full bg-teal-600">
                <span className="sr-only">Loading</span>
              </div>
            </section>
          )}

          {hasMore === false && (
            <p className="ch-text">
              That's it. But there's{' '}
              <a
                className="text-teal-700 underline"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(
                    'subscribe_to_newsletter',
                  )
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                href="#subscribe_to_newsletter"
              >
                more on the way
              </a>
              .
            </p>
          )}
        </div>
      )}
    </div>
  )
}
