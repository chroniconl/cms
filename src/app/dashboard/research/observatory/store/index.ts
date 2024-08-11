import { create } from 'zustand'

export interface HistoryItem {
  id: string
  created_at: string
  full_url: string
  page_title: string
  raw_contents: string
}

export interface ObservatoryStore {
  url: string
  setUrl: (url: string) => void
  html: string
  setHtml: (html: string) => void
  headHtml: string
  setHeadHtml: (headHtml: string) => void
  bodyHtml: string
  setBodyHtml: (bodyHtml: string) => void
  prompt: string
  setPrompt: (prompt: string) => void
  history: HistoryItem[]
  setHistory: (history: HistoryItem[]) => void
  loadingHistory: boolean
  setLoadingHistory: (loadingHistory: boolean) => void
  jobResponse: any
  setJobResponse: (jobResponse: any) => void
  contentPreviewType: 'default' | 'head' | 'body'
  setContentPreviewType: (
    contentPreviewType: 'default' | 'head' | 'body',
  ) => void
}

export const useObservatoryStore = create<ObservatoryStore>((set) => ({
  url: '',
  setUrl: (url: string) => set({ url }),
  html: '',
  setHtml: (html: string) => set({ html }),
  headHtml: '',
  setHeadHtml: (headHtml: string) => set({ headHtml }),
  bodyHtml: '',
  setBodyHtml: (bodyHtml: string) => set({ bodyHtml }),
  prompt: '',
  setPrompt: (prompt: string) => set({ prompt }),
  history: [],
  setHistory: (history: any[]) => set({ history }),
  loadingHistory: true,
  setLoadingHistory: (loadingHistory: boolean) => set({ loadingHistory }),
  jobResponse: null,
  setJobResponse: (jobResponse: any) => set({ jobResponse }),
  contentPreviewType: 'default',
  setContentPreviewType: (contentPreviewType: 'default' | 'head' | 'body') =>
    set({ contentPreviewType }),
}))
