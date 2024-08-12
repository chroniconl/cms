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
  loadingUrlResponse: boolean
  setLoadingUrlResponse: (loadingUrlResponse: boolean) => void
  copiedToClipboard: boolean
  setCopiedToClipboard: (copiedToClipboard: boolean) => void

  // After the user clicks the "Fetch HTML" button
  // Their presented with a secondary form to select the action
  prompt: string
  setPrompt: (prompt: string) => void
  loadingActionResponse: boolean
  setLoadingActionResponse: (loadingActionResponse: boolean) => void
  actionResponse: any
  setActionResponse: (actionResponse: any) => void
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
  history: [],
  setHistory: (history: any[]) => set({ history }),
  loadingHistory: true,
  setLoadingHistory: (loadingHistory: boolean) => set({ loadingHistory }),
  jobResponse: null,
  setJobResponse: (jobResponse: any) => set({ jobResponse }),
  contentPreviewType: 'default' as 'default' | 'head' | 'body',
  setContentPreviewType: (contentPreviewType: 'default' | 'head' | 'body') =>
    set({ contentPreviewType }),
  loadingUrlResponse: false,
  setLoadingUrlResponse: (loadingUrlResponse: boolean) =>
    set({ loadingUrlResponse }),
  copiedToClipboard: false,
  setCopiedToClipboard: (copiedToClipboard: boolean) =>
    set({ copiedToClipboard }),
  prompt: '',
  setPrompt: (prompt: string) => set({ prompt }),
  loadingActionResponse: false,
  setLoadingActionResponse: (loadingActionResponse: boolean) =>
    set({ loadingActionResponse }),
  actionResponse: null,
  setActionResponse: (actionResponse: any) => set({ actionResponse }),
}))
