'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChButtonPrimary, ChButtonSecondary } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useEffect } from 'react'
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
import { cn } from '@/utils/cn'
import TypedComponent from '@/components/Typed'
import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardIcon,
} from 'lucide-react'
import BorderBottom from '@/components/BorderBottom'

export default async function Page() {
  return (
    <div className="mx-auto w-full">
      <Screen />
    </div>
  )
}

const Screen = () => {
  const url = useObservatoryStore((state) => state.url)
  const setUrl = useObservatoryStore((state) => state.setUrl)
  const html = useObservatoryStore((state) => state.html)
  const setHtml = useObservatoryStore((state) => state.setHtml)
  const contentPreviewType = useObservatoryStore(
    (state) => state.contentPreviewType,
  )
  const headHtml = useObservatoryStore((state) => state.headHtml)
  const setHeadHtml = useObservatoryStore((state) => state.setHeadHtml)
  const bodyHtml = useObservatoryStore((state) => state.bodyHtml)
  const setBodyHtml = useObservatoryStore((state) => state.setBodyHtml)
  const loadingUrlResponse = useObservatoryStore(
    (state) => state.loadingUrlResponse,
  )
  const setLoadingUrlResponse = useObservatoryStore(
    (state) => state.setLoadingUrlResponse,
  )
  const copiedToClipboard = useObservatoryStore(
    (state) => state.copiedToClipboard,
  )
  const setCopiedToClipboard = useObservatoryStore(
    (state) => state.setCopiedToClipboard,
  )

  const handleFetchHTML = async () => {
    setLoadingUrlResponse(true)
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
      setLoadingUrlResponse(false)
      return
    }

    setHtml(data?.content)
    setHeadHtml(data?.head_content_only)
    setBodyHtml(data?.body_content_only)

    setLoadingUrlResponse(false)
    toast({
      title: 'Success',
      description: 'HTML fetched successfully',
    })
  }

  const handleGenerate = async () => {}

  const handleCopyToClipboard = () => {
    let contentToCopy = ''
    switch (contentPreviewType) {
      case 'head':
        contentToCopy = headHtml
        break
      case 'body':
        contentToCopy = bodyHtml
        break
      default:
        contentToCopy = html
    }

    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        toast({
          title: 'Copied to clipboard',
          description: 'The HTML content has been copied to your clipboard.',
        })
        setCopiedToClipboard(true)

        setTimeout(() => {
          setCopiedToClipboard(false)
        }, 2000)
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Failed to copy content to clipboard.',
          variant: 'destructive',
        })
      })
  }

  return (
    <div className="min-h-dvh flex-1">
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <div className="mb-2 flex justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Observatory (Preview)
                </h2>
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
                <ChButtonPrimary onClick={handleFetchHTML} disabled={!url}>
                  Fetch HTML
                </ChButtonPrimary>
              </div>
            </div>

            <div className="ch-border-left ml-[28px] h-6 w-1" />
            <div className="flex items-center space-x-2">
              <div
                className={cn([
                  'ml-[20px] h-4 w-4 rounded-full',
                  loadingUrlResponse && 'animate-pulse border border-green-500',
                  !loadingUrlResponse && !html && 'ch-border-outline',
                  !loadingUrlResponse && html && 'ch-border-outline',
                ])}
              />

              <div>
                {loadingUrlResponse && (
                  <p className="text-xs text-green-300">
                    <TypedComponent strings={['Processing request...']} />
                  </p>
                )}
                {!loadingUrlResponse && html && (
                  <p className="ch-body">
                    <TypedComponent
                      strings={['HTML retrieved']}
                      showCursor={false}
                    />
                  </p>
                )}
              </div>
            </div>
            <div className="ch-border-left ml-[28px] h-6 w-1" />
            <div className="relative">
              {html && (
                <ChButtonSecondary
                  className="absolute right-4 top-4 w-fit"
                  disabled={copiedToClipboard}
                  onClick={handleCopyToClipboard}
                >
                  {!copiedToClipboard ? (
                    <ClipboardIcon className="h-5 w-5" />
                  ) : (
                    <ClipboardCheckIcon className="h-5 w-5" />
                  )}
                </ChButtonSecondary>
              )}

              <pre
                contentEditable
                className="ch-card max-h-[300px] min-h-[300px] w-full overflow-auto rounded-md p-4 text-xs"
              >
                <code>
                  {contentPreviewType === 'head' && headHtml}
                  {contentPreviewType === 'body' && bodyHtml}
                  {contentPreviewType === 'default' && html}
                  {html.length === 0 &&
                    "There's nothing to display here. Enter a URL above to get started."}
                </code>
              </pre>
            </div>
            <div className="mb-8 mt-12">
              <div className="ch-border-bottom w-full" />
            </div>
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
                    <div className="mb-4 mt-2">
                      <BorderBottom />
                    </div>
                  </SheetHeader>
                  <History />
                </SheetContent>
              </Sheet>
            </div>
            <ObserverControls />
            {html && (
              <>
                <div className="ch-border-left ml-[28px] h-6 w-1" />
                <div className="flex items-center space-x-2">
                  <div className="ml-[20px] h-4 w-4 animate-pulse rounded-full border border-green-500" />
                  <div>
                    <p className="text-xs text-green-300">
                      <TypedComponent strings={['Observatory is active']} />
                    </p>
                  </div>
                </div>
                <div className="ch-border-left ml-[28px] h-6 w-1" />
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
