'use client'
import { type Post } from '@/components/BlogPostsGroup'
import { DndContext } from '@dnd-kit/core'
import { useEffect } from 'react'
import { create } from 'zustand'

interface SortableAppStore {
  skeletonKeys: string[]
  setSkeletonKeys: (skeletonKeys: string[]) => void

  coreArticles: Post[]
  setCoreArticles: (coreArticles: Post[]) => void

  order: { postId: string | null; skeletonKey: string; index: number }[]
  setDefaultOrder: (
    order: { postId: string | null; skeletonKey: string }[],
  ) => void
  setUpdatedOrder: (postId: string, skeletonKey: string) => void
  removeOrderedItem: (postId: string) => void

  draggableArticleOrder: { postId: string; show: boolean }[]
  setDefaultDraggableArticleOrder: (
    draggableArticleOrder: { postId: string; show: boolean }[],
  ) => void
  updateDraggableArticle: (postId: string, show: boolean) => void
}

export const useSortableAppStore = create<SortableAppStore>((set) => ({
  skeletonKeys: [],
  setSkeletonKeys: (skeletonKeys: string[]) => set({ skeletonKeys }),

  coreArticles: [],
  setCoreArticles: (coreArticles: Post[]) => set({ coreArticles }),

  order: [],
  setDefaultOrder: (
    order: { postId: string | null; skeletonKey: string }[],
  ) => {
    set({
      order: order.map((data, i) => ({
        postId: data?.postId || null,
        skeletonKey: data?.skeletonKey || '',
        index: i + 1,
      })),
    })
  },
  setUpdatedOrder: (postId: string, skeletonKey: string) => {
    set((state) => ({
      order: state.order.map((item) => {
        if (item.skeletonKey === skeletonKey) {
          return {
            ...item,
            postId,
          }
        }
        return item
      }),
    }))
  },
  removeOrderedItem: (postId: string) => {
    set((state) => ({
      order: state.order.map((item) => {
        if (item.postId === postId) {
          return {
            ...item,
            postId: null,
          }
        }
        return item
      }),
    }))
  },

  draggableArticleOrder: [],
  setDefaultDraggableArticleOrder: (
    draggableArticleOrder: {
      postId: string
      show: boolean
    }[],
  ) => set({ draggableArticleOrder }),
  updateDraggableArticle: (postId: string, show: boolean) => {
    set((state) => ({
      draggableArticleOrder: state.draggableArticleOrder.map((item) => {
        if (item.postId === postId) {
          return {
            ...item,
            show,
          }
        }
        return item
      }),
    }))
  },
}))

export const SortableAppContext = ({ children }: any) => {
  const setUpdatedOrder = useSortableAppStore((state) => state.setUpdatedOrder)
  const order = useSortableAppStore((state) => state.order)
  const removeOrderedItem = useSortableAppStore(
    (state) => state.removeOrderedItem,
  )
  const updateDraggableArticle = useSortableAppStore(
    (state) => state.updateDraggableArticle,
  )

  return (
    <DndContext
      onDragEnd={({ active, over }: any) => {
        const orderedItem = order.find((item) => item.postId === active.id)

        // if active.id is already in the order array, remove it
        if (orderedItem) {
          removeOrderedItem(active.id)
        }

        // if over is not null, update the order
        if (over) {
          if (active?.data?.current?.draggedFrom === 'skeleton') {
            // We already remove the item being dragged above
            // We already update the item being dragged below
            // So we only need to update the over item to the active location here
            const overOrderedItem = order.find(
              (item) => item.skeletonKey === over.id,
            )

            if (overOrderedItem?.postId && orderedItem?.skeletonKey) {
              setUpdatedOrder(overOrderedItem.postId, orderedItem?.skeletonKey)
            }
          }

          setUpdatedOrder(active.id, over.id)
          updateDraggableArticle(active.id, false)
        }
      }}
    >
      {children}
    </DndContext>
  )
}
