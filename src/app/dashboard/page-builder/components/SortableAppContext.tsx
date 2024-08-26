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

  order: { postId: string | null; skeletonKey: string }[]
  setDefaultOrder: (
    order: { postId: string | null; skeletonKey: string }[],
  ) => void
  setUpdatedOrder: (postId: string, skeletonKey: string) => void

  draggableArticleOrder: string[]
  setDefaultDraggableArticleOrder: (draggableArticleOrder: string[]) => void
  removeDraggableArticle: (postId: string, skeletonKey: string) => void
}

export const useSortableAppStore = create<SortableAppStore>((set) => ({
  skeletonKeys: [],
  setSkeletonKeys: (skeletonKeys: string[]) => set({ skeletonKeys }),

  coreArticles: [],
  setCoreArticles: (coreArticles: Post[]) => set({ coreArticles }),

  order: [],
  setDefaultOrder: (order: { postId: string | null; skeletonKey: string }[]) =>
    set({ order }),
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

  draggableArticleOrder: [],
  setDefaultDraggableArticleOrder: (draggableArticleOrder: string[]) =>
    set({ draggableArticleOrder }),
  removeDraggableArticle: (postId: string, skeletonKey: string) => {
    set((state) => ({
      draggableArticleOrder: state.draggableArticleOrder.map((item) => {
        if (item === skeletonKey) {
          return postId
        }
        return item
      }),
    }))
  },
}))

export const SortableAppContext = ({ children }: any) => {
  const setUpdatedOrder = useSortableAppStore((state) => state.setUpdatedOrder)

  return (
    <DndContext
      onDragEnd={({ active, over }: any) => {
        if (over) {
          console.log('active', active)
          console.log('over', over)
          setUpdatedOrder(active.id, over.id)
        }
      }}
    >
      {children}
    </DndContext>
  )
}
