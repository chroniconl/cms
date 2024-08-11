'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  ChButtonPrimary,
  ChButtonPrimaryMarketing,
} from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { useEffect } from 'react'
import DOMPurify from 'dompurify'
import { Text } from '@/components/text'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useObservatoryStore } from './store'
import { ObserverHistory } from './components/ObserverHistory'
import { ObserverControls } from './components/ObserverControls'
import { ObserverActions } from './components/ObserverActions'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'

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
  const useRawOnly = useObservatoryStore((state) => state.useRawOnly)
  const useSanitizeHtml = useObservatoryStore((state) => state.useSanitizeHtml)
  const tab = useObservatoryStore((state) => state.tab)
  const setTab = useObservatoryStore((state) => state.setTab)

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
            <div className="mb-2 flex justify-between">
              <div>
                <h2 className="text-3xl font-bold">Observatory (Preview)</h2>
                <p className="ch-body ch-muted">
                  Enter a URL to fetch the HTML to begin exploring the site.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="url" className="sr-only">
                Enter URL
              </Label>
              <div className="flex items-center gap-4">
                {/* TODO add input validation to ensure the URL is valid */}
                <Input
                  id="url"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <ChButtonPrimaryMarketing
                  onClick={handleFetchHTML}
                  disabled={!url}
                >
                  Fetch HTML
                </ChButtonPrimaryMarketing>
              </div>
            </div>
            <div className="mb-8 mt-12">
              <div className="ch-border-bottom w-full" />
            </div>

            <>
              <Tabs defaultValue="raw" value={tab} onValueChange={setTab}>
                <div className="flex w-full items-center justify-between">
                  <div className="flex w-full items-center space-x-2">
                    <h3 className="text-xl font-bold">Visual Preview</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 hover:text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent className="sm:max-w-[425px]">
                          <p className="ch-body ch-muted ">
                            Preview the page contents as it was captured in a
                            mini window.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <TabsList>
                    <TabsTrigger value="preview" disabled={useRawOnly}>
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="raw">Raw</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="preview">
                  {!useRawOnly ? (
                    <div
                      className="ch-card max-h-[500px] min-h-[300px] w-full overflow-auto rounded-md  p-4 text-primary-foreground"
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
                  <pre
                    contentEditable
                    className="ch-card max-h-[500px] min-h-[300px] w-full overflow-auto rounded-md p-4 text-xs"
                  >
                    <code>{html.trim()}</code>
                  </pre>
                </TabsContent>
              </Tabs>
              <div className="mb-8 mt-12">
                <div className="ch-border-bottom w-full" />
              </div>
            </>
          </div>
          <div className="col-span-4">
            <div className="mb-4 flex w-full">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-sm text-blue-400 hover:underline">
                    View History
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>History</SheetTitle>
                    <SheetDescription>
                      View and manage all the URLs you've visited in the
                      Observatory.
                    </SheetDescription>
                  </SheetHeader>
                  <History />
                </SheetContent>
              </Sheet>
            </div>
            <ObserverControls />
            {html && (
              <>
                <div className="ch-border-left ml-6 h-6 w-1" />
                <div className="flex items-center space-x-2">
                  <div className="ml-4 h-4 w-4 animate-pulse rounded-full border border-green-500" />
                  <div>
                    <p className="text-xs text-green-300">
                      Observatory is active
                    </p>
                  </div>
                </div>
                <div className="ch-border-left ml-6 h-6 w-1" />
                <ObserverActions />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const History = () => {
  const history = useObservatoryStore((state) => state.history)
  const setHistory = useObservatoryStore((state) => state.setHistory)
  const setLoadingHistory = useObservatoryStore(
    (state) => state.setLoadingHistory,
  )

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
      setLoadingHistory(false)
    }

    fetchHistory()
  }, [])

  return (
    <ScrollArea className="mt-4 h-[500px]">
      <ObserverHistory history={history} />
    </ScrollArea>
  )
}
