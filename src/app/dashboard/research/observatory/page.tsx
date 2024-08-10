'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChButtonPrimary } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { useEffect } from 'react'
import { formatDateWithTimeToo } from '@/utils/dates'
import DOMPurify from 'dompurify'
import { Text } from '@/components/text'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { create } from 'zustand'

interface HistoryItem {
  id: string
  created_at: string
  full_url: string
  page_title: string
  raw_contents: string
}

interface ObservatoryStore {
  url: string
  setUrl: (url: string) => void
  html: string
  setHtml: (html: string) => void
  prompt: string
  setPrompt: (prompt: string) => void
  useRawOnly: boolean
  setUseRawOnly: (useRawOnly: boolean) => void
  useSanitizeHtml: boolean
  setUseSanitizeHtml: (useSanitizeHtml: boolean) => void
  history: HistoryItem[]
  setHistory: (history: HistoryItem[]) => void
  sort: 'Ascending' | 'Descending'
  setSort: (sort: 'Ascending' | 'Descending') => void
}

const useObservatoryStore = create<ObservatoryStore>((set) => ({
  url: '',
  setUrl: (url: string) => set({ url }),
  html: '',
  setHtml: (html: string) => set({ html }),
  prompt: '',
  setPrompt: (prompt: string) => set({ prompt }),
  useRawOnly: false,
  setUseRawOnly: (useRawOnly: boolean) => set({ useRawOnly }),
  useSanitizeHtml: true,
  setUseSanitizeHtml: (useSanitizeHtml: boolean) => set({ useSanitizeHtml }),
  history: [],
  setHistory: (history: any[]) => set({ history }),
  sort: 'Ascending',
  setSort: (sort: 'Ascending' | 'Descending') => set({ sort }),
}))

export default async function Page() {
  return (
    <div className="mx-auto w-full">
      <Screen />
    </div>
  )
}

const promptSuggestions = [
  'Write a script to extract all the links from this file',
  'Suggest recurring information I can extract from this file',
  'Find and extract all the headings from the HTML',
  'Extract all the images and their sources from the HTML',
  'Analyze the HTML structure and suggest ways to improve it',
]

const Screen = () => {
  const url = useObservatoryStore((state) => state.url)
  const setUrl = useObservatoryStore((state) => state.setUrl)
  const html = useObservatoryStore((state) => state.html)
  const setHtml = useObservatoryStore((state) => state.setHtml)
  const prompt = useObservatoryStore((state) => state.prompt)
  const setPrompt = useObservatoryStore((state) => state.setPrompt)
  const useRawOnly = useObservatoryStore((state) => state.useRawOnly)
  const setUseRawOnly = useObservatoryStore((state) => state.setUseRawOnly)
  const useSanitizeHtml = useObservatoryStore((state) => state.useSanitizeHtml)
  const setUseSanitizeHtml = useObservatoryStore(
    (state) => state.setUseSanitizeHtml,
  )

  const handleFetchHTML = async () => {
    const response = await fetch('/api/v1/trendy/observatory-search', {
      method: 'POST',
      body: JSON.stringify({
        url: url,
      }),
    })

    const { data, error, message } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
      return
    }

    const sanitizedHtml = DOMPurify.sanitize(data?.content)
    const html = useSanitizeHtml ? sanitizedHtml : data?.content
    setHtml(html)

    toast({
      title: 'Success',
      description: 'HTML fetched successfully',
    })
  }

  const handleGenerate = async () => {}

  return (
    <div className="min-h-dvh flex-1">
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <div className="mb-2 flex flex-col gap-4">
              <h2 className="text-3xl font-bold">Observatory (Preview)</h2>
              <p className="ch-body ch-muted">
                Enter a URL to fetch the HTML to begin exploring the site.
              </p>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="url" className="sr-only">
                Enter URL
              </Label>
              {/* TODO add input validation to ensure the URL is valid */}
              <Input
                id="url"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="mb-12 mt-8 space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="useRawOnly"
                    checked={useRawOnly}
                    onCheckedChange={setUseRawOnly}
                  />
                  <div className="flex flex-col">
                    <Label className="text-white" htmlFor="useRawOnly">
                      View Raw Data Only
                    </Label>
                    <p className="ch-body ch-muted">
                      Disabling the preview can help with responses that have
                      weird CSS or JS rules that break the app.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sanitizeHtml"
                    checked={useSanitizeHtml}
                    onCheckedChange={setUseSanitizeHtml}
                  />
                  <div className="flex flex-col">
                    <Label className="text-white" htmlFor="sanitizeHtml">
                      Sanitize HTML
                    </Label>
                    <p className="ch-body ch-muted">
                      Reduce the risk of XSS attacks by sanitizing the HTML.
                    </p>
                  </div>
                </div>
              </div>
              <ChButtonPrimary
                className="mt-2"
                onClick={handleFetchHTML}
                disabled={!url}
              >
                Fetch HTML
              </ChButtonPrimary>
            </div>
            <div className="mb-8 mt-4">
              <div className="ch-border-bottom w-full" />
            </div>
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                {!useRawOnly ? (
                  <div
                    className="ch-border max-h-[500px] min-h-[300px] w-full overflow-auto rounded-md p-4 text-primary-foreground"
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(JSON.stringify(html)),
                    }}
                  />
                ) : (
                  <div className="ch-border max-h-[500px] min-h-[300px] w-full overflow-auto rounded-md p-4 text-primary-foreground opacity-40">
                    <Text>Content preview is disabled for raw data</Text>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="raw">
                <pre className="ch-border max-h-[500px] min-h-[300px] w-full overflow-auto rounded-md p-4 text-xs">
                  <code>{html}</code>
                </pre>
              </TabsContent>
            </Tabs>

            {html && (
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold">AI Suggestions</h3>
                <div className="grid gap-2">
                  {promptSuggestions.map((prompt) => (
                    <div
                      key={prompt}
                      className="ch-border rounded-md p-2"
                      onClick={() => setPrompt(prompt)}
                    >
                      <div className="font-medium">{prompt}</div>
                    </div>
                  ))}

                  <Input
                    id="prompt"
                    placeholder="Enter a prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <ChButtonPrimary className="mt-2" onClick={handleGenerate}>
                    Generate
                  </ChButtonPrimary>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-4">
            <History />
          </div>
        </div>
      </div>
    </div>
  )
}

const History = () => {
  const history = useObservatoryStore((state) => state.history)
  const setHistory = useObservatoryStore((state) => state.setHistory)
  const sort = useObservatoryStore((state) => state.sort)
  const setSort = useObservatoryStore((state) => state.setSort)

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch('/api/v1/trendy/history', {
        method: 'GET',
      })

      const { data, error } = await response.json()
      if (error) {
        throw new Error('Failed to fetch history')
      }

      setHistory(data)
    }

    fetchHistory()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">History</h2>
        <p className="ch-body ch-muted">
          Here you can view all the URLs you've visited in the Observatory.
        </p>
      </div>
      <div>
        <div className="mb-2 flex items-center space-x-2">
          <Input placeholder="Search history..." />
        </div>
        <div>
          <Label htmlFor="sort">Sort by</Label>
          <Select
            name="sort"
            value={sort}
            onValueChange={(value) =>
              setSort(value === 'Ascending' ? 'Ascending' : 'Descending')
            }
          >
            <SelectTrigger className="flex w-full items-center justify-between">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent className="z-10">
              <SelectItem value="Ascending">Ascending</SelectItem>
              <SelectItem value="Descending">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-h-[500px] space-y-4 overflow-y-auto p-1">
        {history.map((item) => (
          <div key={item.id} className="ch-border-outline p-4">
            <p className="ch-body ch-primary">{item.page_title}</p>
            <p className="ch-body">{item.full_url}</p>
            <p className="ch-body ch-muted">
              {formatDateWithTimeToo(item.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
