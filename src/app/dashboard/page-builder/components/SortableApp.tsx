'use client'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utils/cn'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useState } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Article, type Post } from '@/components/BlogPostsGroup'

const SkeletonCardDropZone = ({ children, uuid }: any) => {
  const { setNodeRef } = useDroppable({
    id: uuid,
  })

  return (
    <div
      ref={setNodeRef}
      className="flex h-[250px] w-full items-center justify-center rounded-md border border-dashed border-stone-700"
    >
      {children}
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
    transition: 'transform 0.2s ease',
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

  const [postOrder, setPostOrder] = useState(
    posts.map((post: { id: string }) => post.id),
  )

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
        Page Builder
      </h2>
      <p className="mb-8">
        Sorting is a great way to organize your content. You can sort by
        publishing date, title, or any other field you've added to your post
        metadata.
      </p>

      <div className="grid grid-cols-12 gap-4">
        <div className="ch-border-outline sticky top-10 col-span-3 h-fit rounded-md bg-card">
          <div className="flex flex-col gap-2">
            {postOrder.map((postId: string) => {
              const post = posts.find((p: { id: string }) => p.id === postId)

              if (!post) {
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
            })}
          </div>
        </div>

        <div className="ch-border-outline col-span-9 rounded-md bg-card">
          <div className="grid grid-cols-1 gap-4 p-4 px-4 md:mx-0 md:grid-cols-2 lg:grid-cols-3">
            {skeletonKeys.map((uuid: string, i: number) => (
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
