'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@chroniconl/ui/tooltip'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Article, type Post } from '@/components/BlogPostsGroup'
import { useSortableAppStore } from './SortableAppContext'
import { Loader2 } from 'lucide-react'
import { create } from 'zustand'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@chroniconl/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@chroniconl/ui/dialog'
import { MoreVertical } from 'lucide-react'

interface PostClient {
  id: string
  title: string
  date: string
  tag: string
  author: string
}

const initialPosts: PostClient[] = [
  {
    id: '1',
    title: 'Less Buggy Prototype Software',
    date: '2024-08-01',
    tag: 'Software',
    author: 'John Doe',
  },
  {
    id: '2',
    title: 'Buggy Prototype Software and ihop',
    date: '2024-08-02',
    tag: 'Software',
    author: 'Jane Smith',
  },
  {
    id: '3',
    title: 'Avoiding Perfection (as a Feature)',
    date: '2024-08-03',
    tag: 'Development',
    author: 'Alice Johnson',
  },
  {
    id: '4',
    title: 'Is my logger stupid or nah?',
    date: '2024-08-04',
    tag: 'Debugging',
    author: 'Bob Williams',
  },
  {
    id: '5',
    title: 'Chroniconi Project Update #2',
    date: '2024-08-05',
    tag: 'Project',
    author: 'Charlie Brown',
  },
  {
    id: '6',
    title: "Why Most Companies Won't Let You Mess With Your Website Code",
    date: '2024-08-06',
    tag: 'Web Development',
    author: 'Diana Prince',
  },
  {
    id: '7',
    title: 'Just Enough Server React to Keep It Moving',
    date: '2024-08-07',
    tag: 'React',
    author: 'Ethan Hunt',
  },
  {
    id: '8',
    title: 'Serving Static Content with Go and Gin',
    date: '2024-08-08',
    tag: 'Go',
    author: 'Fiona Gallagher',
  },
  {
    id: '9',
    title: 'How To Create a PostgreSQL Instance In Railway',
    date: '2024-08-09',
    tag: 'Database',
    author: 'George Costanza',
  },
  {
    id: '10',
    title: 'Connect to PostgreSQL with Golang',
    date: '2024-08-10',
    tag: 'Go',
    author: 'Hermione Granger',
  },
  {
    id: '11',
    title: 'A Step-by-Step Guide to Using Environment Variables in Go',
    date: '2024-08-11',
    tag: 'Go',
    author: 'Ian Malcolm',
  },
]

interface PostListStore {
  posts: PostClient[]
  setPosts: (posts: PostClient[]) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  showDate: boolean
  setShowDate: (showDate: boolean) => void
  showTag: boolean
  setShowTag: (showTag: boolean) => void
  showAuthor: boolean
  setShowAuthor: (showAuthor: boolean) => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (sortOrder: 'asc' | 'desc') => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isAddToPositionOpen: boolean
  setIsAddToPositionOpen: (isAddToPositionOpen: boolean) => void
  selectedPosition: number | null
  setSelectedPosition: (selectedPosition: number | null) => void
}

const usePostListStore = create<PostListStore>((set) => ({
  posts: [],
  setPosts: (posts: PostClient[]) => set({ posts }),
  searchTerm: '',
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  showDate: true,
  setShowDate: (showDate: boolean) => set({ showDate }),
  showTag: true,
  setShowTag: (showTag: boolean) => set({ showTag }),
  showAuthor: true,
  setShowAuthor: (showAuthor: boolean) => set({ showAuthor }),
  sortOrder: 'desc',
  setSortOrder: (sortOrder: 'asc' | 'desc') => set({ sortOrder }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isAddToPositionOpen: false,
  setIsAddToPositionOpen: (isAddToPositionOpen: boolean) =>
    set({ isAddToPositionOpen }),
  selectedPosition: null,
  setSelectedPosition: (selectedPosition: number | null) =>
    set({ selectedPosition }),
}))

function PostCard({
  post,
  isAlreadyUsed,
}: {
  post: PostClient
  isAlreadyUsed: boolean
}) {
  const showDate = usePostListStore((state) => state.showDate)
  const showTag = usePostListStore((state) => state.showTag)
  const showAuthor = usePostListStore((state) => state.showAuthor)
  const sortOrder = usePostListStore((state) => state.sortOrder)
  const setIsAddToPositionOpen = usePostListStore(
    (state) => state.setIsAddToPositionOpen,
  )

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: post.id,
      disabled: isAlreadyUsed,
    })
  const adjustedTransform = {
    ...transform,
    scaleX: 1,
    scaleY: 1,
  }

  const style = {
    transform: adjustedTransform
      ? `translate3d(${adjustedTransform.x}px, ${adjustedTransform.y}px, 0) scale(1)`
      : 'none',
    transition: 'transform 0.02s ease',
  }

  const handleGetShareableURL = () => {
    // Here you would implement the logic to generate and copy a shareable URL
    console.log('Getting shareable URL')
  }

  return (
    <div
      ref={setNodeRef}
      style={isDragging ? style : {}}
      {...attributes}
      {...listeners}
    >
      {!isDragging ? (
        <Card key={post.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  {showDate && <p>{post.date}</p>}
                  {showTag && (
                    <Badge variant="secondary" className="mt-1">
                      {post.tag}
                    </Badge>
                  )}
                  {showAuthor && <p className="mt-1">By {post.author}</p>}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => setIsAddToPositionOpen(true)}
                  >
                    Add to position
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleGetShareableURL}>
                    Get shareable URL
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ) : (
        // @ts-ignore This is going to have to be addressed just need to commit
        <Article post={post} noImage noLink />
      )}
    </div>
  )
}

export default function PostList() {
  const posts = usePostListStore((state) => state.posts)
  const setPosts = usePostListStore((state) => state.setPosts)
  const searchTerm = usePostListStore((state) => state.searchTerm)
  const setSearchTerm = usePostListStore((state) => state.setSearchTerm)
  const showDate = usePostListStore((state) => state.showDate)
  const setShowDate = usePostListStore((state) => state.setShowDate)
  const showTag = usePostListStore((state) => state.showTag)
  const setShowTag = usePostListStore((state) => state.setShowTag)
  const showAuthor = usePostListStore((state) => state.showAuthor)
  const setShowAuthor = usePostListStore((state) => state.setShowAuthor)
  const sortOrder = usePostListStore((state) => state.sortOrder)
  const setSortOrder = usePostListStore((state) => state.setSortOrder)
  const isLoading = usePostListStore((state) => state.isLoading)
  const setIsLoading = usePostListStore((state) => state.setIsLoading)
  const isAddToPositionOpen = usePostListStore(
    (state) => state.isAddToPositionOpen,
  )
  const setIsAddToPositionOpen = usePostListStore(
    (state) => state.setIsAddToPositionOpen,
  )
  const selectedPosition = usePostListStore((state) => state.selectedPosition)
  const setSelectedPosition = usePostListStore(
    (state) => state.setSelectedPosition,
  )

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const filteredAndSortedPosts = initialPosts
        .filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })
      setPosts(filteredAndSortedPosts)
      setIsLoading(false)
    }
    loadPosts()
  }, [searchTerm, sortOrder])

  const handleAddToPosition = () => {
    // Here you would implement the logic to add the post to the selected position
    console.log(`Adding post to position: ${selectedPosition}`)
    setIsAddToPositionOpen(false)
    setSelectedPosition(null)
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold text-white">Post List</h2>
      <p className="mb-4">
        View and filter your posts using the controls below.
      </p>

      <div className="mb-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Toggle pressed={showDate} onPressedChange={setShowDate}>
            Date
          </Toggle>
          <Toggle pressed={showTag} onPressedChange={setShowTag}>
            Tag
          </Toggle>
          <Toggle pressed={showAuthor} onPressedChange={setShowAuthor}>
            Author
          </Toggle>
          <Select
            value={sortOrder}
            onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest first</SelectItem>
              <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="mb-2 text-sm text-muted-foreground">
            Total posts: {posts.length}
          </div>
          <div className="space-y-2">
            {posts.map((post) => (
              // @ts-ignore This is going to have to be addressed just need to commit
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div className="py-10 text-center">
          <h3 className="mb-2 text-lg font-semibold">No posts found</h3>
          <p className="mb-4 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => setSearchTerm('')}>Clear search</Button>
        </div>
      )}

      <Dialog open={isAddToPositionOpen} onOpenChange={setIsAddToPositionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to position</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select
              value={selectedPosition?.toString() || ''}
              onValueChange={(value) =>
                setSelectedPosition(parseInt(value, 10))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    Position {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddToPosition} disabled={!selectedPosition}>
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const SkeletonCardDropZone = ({ children, uuid }: any) => {
  const order = useSortableAppStore((state) =>
    state.order.find((item) => item.skeletonKey === uuid),
  )

  const article = useSortableAppStore((state) =>
    state.coreArticles.find((p) => p.id === order?.postId),
  )

  const { setNodeRef } = useDroppable({
    id: uuid,
  })
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: article?.id as string,
    disabled: article?.id ? false : true,
    data: {
      draggedFrom: 'skeleton',
    },
  })

  const adjustedTransform = {
    ...transform,
    scaleX: 1,
    scaleY: 1,
  }

  const style = {
    transform: adjustedTransform
      ? `translate3d(${adjustedTransform.x}px, ${adjustedTransform.y}px, 0) scale(1)`
      : 'none',
    transition: 'transform 0.02s ease',
  }

  // console.log('article', article)

  return (
    <div
      ref={setNodeRef}
      className={cn([
        'w-full',
        (!article || isDragging) &&
          'flex h-[250px] items-center justify-center rounded-md border border-dashed border-stone-700',
      ])}
    >
      {article || (article && !isDragging) ? (
        <div
          ref={setDraggableNodeRef}
          style={isDragging ? style : {}}
          {...attributes}
          {...listeners}
        >
          <Article post={article} noImage noLink />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

const ToolTipCard = ({
  isAlreadyUsed,
  children,
}: {
  children: React.ReactNode
  isAlreadyUsed: boolean
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(['block text-left', isAlreadyUsed && 'opacity-50'])}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isAlreadyUsed
              ? 'This item is already in use elsewhere'
              : 'Drag the item to reorder'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const DraggableArticleCard = ({
  post,
  isAlreadyUsed,
}: {
  post: Post
  isAlreadyUsed: boolean
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: post.id,
      disabled: isAlreadyUsed,
    })
  const adjustedTransform = {
    ...transform,
    scaleX: 1,
    scaleY: 1,
  }

  const style = {
    transform: adjustedTransform
      ? `translate3d(${adjustedTransform.x}px, ${adjustedTransform.y}px, 0) scale(1)`
      : 'none',
    transition: 'transform 0.02s ease',
  }

  return (
    <div
      ref={setNodeRef}
      style={isDragging ? style : {}}
      {...attributes}
      {...listeners}
      className={cn('rounded-md border border-transparent p-2 text-sm', {
        'cursor-pointer': !isAlreadyUsed,
        'hover:border-teal-700 hover:bg-teal-700/60 hover:text-white':
          !isAlreadyUsed && !isDragging,
      })}
    >
      {isDragging ? (
        <Article post={post} noImage noLink />
      ) : (
        <ToolTipCard isAlreadyUsed={isAlreadyUsed}>{post.title}</ToolTipCard>
      )}
    </div>
  )
}

export const SortableApp = ({
  articles,
  skeletonKeys: sk,
}: {
  articles: Post[]
  skeletonKeys: string[]
}) => {
  const alreadyUsed = articles.slice(0, 6)

  const setSkeletonKeys = useSortableAppStore((state) => state.setSkeletonKeys)
  const skeletonKeys = useSortableAppStore((state) => state.skeletonKeys)

  const setCoreArticles = useSortableAppStore((state) => state.setCoreArticles)
  const coreArticles = useSortableAppStore((state) => state.coreArticles)

  const setDefaultOrder = useSortableAppStore((state) => state.setDefaultOrder)
  const order = useSortableAppStore((state) => state.order)

  const draggableArticleOrder = useSortableAppStore(
    (state) => state.draggableArticleOrder,
  )
  const setDefaultDraggableArticleOrder = useSortableAppStore(
    (state) => state.setDefaultDraggableArticleOrder,
  )

  const heading = useSortableAppStore((state) => state.heading)
  const setHeading = useSortableAppStore((state) => state.setHeading)
  const subheading = useSortableAppStore((state) => state.subheading)
  const setSubheading = useSortableAppStore((state) => state.setSubheading)

  useEffect(() => {
    setSkeletonKeys(sk)
    setCoreArticles(articles) // this is for referencing the data in the post
    setDefaultOrder(
      articles.map((_, i) => ({ postId: null, skeletonKey: sk[i] })),
    )
    setDefaultDraggableArticleOrder(
      articles.map((p) => ({ postId: p.id, show: true })),
    )
  }, [])

  return (
    <div className="w-full">
      <div className="ch-border-outline mx-auto mb-4 mt-2 w-full max-w-7xl flex-col items-center rounded-md bg-card p-4">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
          Article Group Manager
        </h2>
        <p className="text-lg">
          You're editing an article group. An article group can be displayed
          anywhere in the UI, and is a nice way of creating categories and / or
          collections of content.
        </p>
      </div>

      <div className="grid grid-cols-12 space-x-4">
        <div className="ch-border-outline sticky top-4 col-span-4 h-fit rounded-md bg-card">
          <div className="flex flex-col gap-2">
            <PostList />
            {draggableArticleOrder.map(
              ({ postId, show }: { postId: string; show: boolean }) => {
                const post = coreArticles.find((p) => p.id === postId)

                if (!post || show === false) {
                  return null
                }

                const isAlreadyUsed = alreadyUsed.some(
                  ({ id }: { id: string }) => post.id === id,
                )

                return (
                  <DraggableArticleCard
                    key={post.id}
                    post={post}
                    isAlreadyUsed={isAlreadyUsed}
                  />
                )
              },
            )}
          </div>
        </div>

        <div className=" col-span-8">
          <div className="flex flex-col gap-4">
            <div className="ch-border-outline flex flex-col gap-2 space-y-2 rounded bg-card p-4">
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="border-none bg-transparent text-3xl font-bold text-white focus:outline-none focus:ring-0"
                placeholder="Enter heading"
              />
              <input
                type="text"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                className="border-none bg-transparent text-xl text-muted-foreground ring-0 focus:outline-none focus:ring-0"
                placeholder="Enter subheading"
              />
            </div>

            <div className="ch-border-outline grid grid-cols-1 gap-4 rounded bg-card p-4 px-4 md:mx-0 md:grid-cols-2 lg:grid-cols-3">
              {skeletonKeys.map((uuid: string, i: number) => (
                <SkeletonCardDropZone key={uuid} uuid={uuid}>
                  {(i += 1)}
                </SkeletonCardDropZone>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
