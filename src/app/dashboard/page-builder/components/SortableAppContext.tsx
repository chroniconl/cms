'use client'
import { type Post } from '@/components/BlogPostsGroup'
import { DndContext } from '@dnd-kit/core'
import { useEffect } from 'react'
import { create } from 'zustand'

interface SortableAppStore {
  skeletonKeys: string[]
  setSkeletonKeys: (skeletonKeys: string[]) => void
  posts: Post[]
  setPosts: (posts: Post[]) => void
  order: { postId: string | null; skeletonKey: string }[]
  setOrder: (order: { postId: string | null; skeletonKey: string }[]) => void
  updateOrder: (postId: string, skeletonKey: string) => void
  postList: string[]
  setPostList: (postList: string[]) => void
}

export const useSortableAppStore = create<SortableAppStore>((set) => ({
  skeletonKeys: [],
  setSkeletonKeys: (skeletonKeys: string[]) => set({ skeletonKeys }),
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
  order: [],
  setOrder: (order: { postId: string | null; skeletonKey: string }[]) =>
    set({ order }),
  updateOrder: (postId: string, skeletonKey: string) => {
    set((state) => ({
      order: state.order.map((item) => {
        if (item.skeletonKey === skeletonKey) {
          return {
            postId,
            skeletonKey,
          }
        }
        return item
      }),
    }))
  },
  postList: [],
  setPostList: (postList: string[]) => set({ postList }),
  removeFromPostList: (postId: string) => {
    set((state) => ({
      postList: state.postList.filter((id) => id !== postId),
    }))
  },
}))

export const SortableAppContext = ({ children }: any) => {
  const updateOrder = useSortableAppStore((state) => state.updateOrder)

  return (
    <DndContext
      onDragEnd={({ active, over }: any) => {
        if (over) {
          updateOrder(active.id, over.id)
        }
      }}
    >
      {children}
    </DndContext>
  )
}
