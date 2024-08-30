'use client'

import { useEffect } from 'react'
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
      <div className="ch-border-outline mx-auto mb-8 mt-6 w-full max-w-7xl flex-col items-center rounded-md bg-card p-4">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
          Page Builder
        </h2>
        <p className="">
          You're editing an article group. An article group can be displayed
          anywhere in the UI, and is a nice way of creating categories and / or
          collections of content.
        </p>
      </div>

      <div className="grid grid-cols-12 space-x-4">
        <div className="ch-border-outline sticky top-4 col-span-3 h-fit rounded-md bg-card">
          <div className="flex flex-col gap-2">
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
