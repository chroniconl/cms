'use client'
import { cn } from '@/utils/cn'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEffect } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Article, type Post } from '@/components/BlogPostsGroup'
import { useSortableAppStore } from './SortableAppContext'

const SkeletonCardDropZone = ({ children, uuid }: any) => {
  const { setNodeRef } = useDroppable({
    id: uuid,
  })

  const order = useSortableAppStore((state) =>
    state.order.find((item) => item.skeletonKey === uuid),
  )
  const post = useSortableAppStore((state) =>
    state.posts.find((p) => p.id === order?.postId),
  )

  return (
    <div
      ref={setNodeRef}
      className={cn([
        'flex w-full items-center justify-center rounded-md border border-dashed border-stone-700',
        !post && ' h-[250px]',
      ])}
    >
      {post ? <Article post={post} noImage /> : <>{children}</>}
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
      style={style}
      {...attributes}
      {...listeners}
      className={cn('rounded-md border border-transparent p-2 text-sm', {
        'cursor-pointer': !isAlreadyUsed,
        'hover:border-teal-700 hover:bg-teal-700/60 hover:text-white':
          !isAlreadyUsed && !isDragging,
      })}
    >
      {isDragging ? (
        <Article post={post} noImage />
      ) : (
        <ToolTipCard isAlreadyUsed={isAlreadyUsed}>{post.title}</ToolTipCard>
      )}
    </div>
  )
}

export const SortableApp = ({
  posts,
  skeletonKeys,
}: {
  posts: Post[]
  skeletonKeys: string[]
}) => {
  const alreadyUsed = posts.slice(0, 6)

  const setSkeletonKeys = useSortableAppStore((state) => state.setSkeletonKeys)
  const sk = useSortableAppStore((state) => state.skeletonKeys)
  const setPosts = useSortableAppStore((state) => state.setPosts)
  const postList = useSortableAppStore((state) => state.posts)
  const setOrder = useSortableAppStore((state) => state.setOrder)
  const order = useSortableAppStore((state) => state.order)
  const setPostList = useSortableAppStore((state) => state.setPostList)

  useEffect(() => {
    setSkeletonKeys(skeletonKeys)
    setPosts(posts) // this is for referencing the data in the post
    setOrder(
      posts.map((_, i) => ({ postId: null, skeletonKey: skeletonKeys[i] })),
    )
    setPostList(posts.map((p) => p.id))
  }, [])

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
        Page Builder
      </h2>
      <p className="mb-8">
        Control the order of your posts by dragging them from the left panel to
        the right panel.
      </p>

      <div className="grid grid-cols-12 gap-4">
        <div className="ch-border-outline sticky top-4 col-span-3 h-fit rounded-md bg-card">
          <div className="flex flex-col gap-2">
            {postList.map((post: Post) => {
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
            })}
          </div>
        </div>

        <div className="ch-border-outline col-span-9 rounded-md bg-card">
          <div className="grid grid-cols-1 gap-4 p-4 px-4 md:mx-0 md:grid-cols-2 lg:grid-cols-3">
            {sk.map((uuid: string, i: number) => (
              <SkeletonCardDropZone key={uuid} uuid={uuid}>
                {(i += 1)}
              </SkeletonCardDropZone>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
