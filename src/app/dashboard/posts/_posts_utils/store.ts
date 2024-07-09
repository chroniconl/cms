import { create } from 'zustand'
import { Category } from './types'

export const useCategoriesStore = create<{
  categories: any[]
  setCategories: (categories: Category[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  touched: boolean
  setTouched: (touched: boolean) => void
}>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
  touched: false,
  setTouched: (touched: boolean) => set({ touched }),
}))

export const useTagsStore = create<{
  tags: any[]
  setTags: (
    tag: {
      id: string
      name: string
      slug: string
    }[],
  ) => void
  loadingTags: boolean
  setLoadingTags: (loading: boolean) => void
  touchedTagsCheckAll: boolean
  setTouchedTagsCheckAll: (touched: boolean) => void
}>((set) => ({
  tags: [],
  setTags: (
    tags: {
      id: string
      name: string
      slug: string
    }[],
  ) => set({ tags }),
  loadingTags: true,
  setLoadingTags: (loading: boolean) => set({ loadingTags: loading }),
  touchedTagsCheckAll: false,
  setTouchedTagsCheckAll: (touched: boolean) =>
    set({ touchedTagsCheckAll: touched }),
}))
