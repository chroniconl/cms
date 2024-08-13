'use client'
import { toast } from '@/components/ui/use-toast'
import { useObservatoryStore } from './store'
import { ObserverControls } from './components/ObserverControls'
import { ObserverActions } from './components/ObserverActions'
import { cn } from '@/utils/cn'
import { ObserverStartForm } from './components/ObserverStartForm'
import { UnstructuredDataDisplay } from './components/UnstructuredDataDisplay'
import { HistorySheet } from './components/HistorySheet'
import { StructuredDataDisplay } from './components/StructuredDataDisplay copy'
import TypedComponent from '@/components/Typed'

export default async function Page() {
  return (
    <div className="mx-auto w-full">
      <Screen />
    </div>
  )
}

const Screen = () => {
  const html = useObservatoryStore((state) => state.html)
  const contentPreviewType = useObservatoryStore(
    (state) => state.contentPreviewType,
  )
  const headHtml = useObservatoryStore((state) => state.headHtml)
  const bodyHtml = useObservatoryStore((state) => state.bodyHtml)
  const loadingUrlResponse = useObservatoryStore(
    (state) => state.loadingUrlResponse,
  )
  const setCopiedToClipboard = useObservatoryStore(
    (state) => state.setCopiedToClipboard,
  )
  const loadingActionResponse = useObservatoryStore(
    (state) => state.loadingActionResponse,
  )
  const actionResponse = useObservatoryStore((state) => state.actionResponse)

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
            <div id="observatory-header" className="mb-2 flex justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Observatory (Preview)
                </h2>
                <p className="ch-body ch-color-secondary">
                  Enter a URL to fetch the HTML to begin exploring the site.
                </p>
              </div>
            </div>

            <ObserverStartForm />

            {/* Stepper */}
            <div id="observatory-step-to-unstructured-data">
              <div className="ch-border-left ml-[28px] h-6 w-1" />
              <div className="flex items-center space-x-2">
                <div
                  className={cn([
                    'ml-[20px] h-4 w-4 rounded-full',
                    loadingUrlResponse &&
                      'animate-pulse border border-green-500',
                    !loadingUrlResponse && !html && 'ch-border-outline',
                    !loadingUrlResponse && html && 'ch-border-outline',
                  ])}
                />

                <div>
                  {loadingUrlResponse && (
                    <p className="text-xs text-green-300">
                      Processing request...
                    </p>
                  )}
                  {!loadingUrlResponse && html && (
                    <p className="ch-body">HTML retrieved</p>
                  )}
                </div>
              </div>
              <div className="ch-border-left ml-[28px] h-6 w-1" />
            </div>

            <UnstructuredDataDisplay />

            {html && (
              <>
                {/* Stepper */}
                <div id="observatory-step-to-structured-data">
                  <div className="ch-border-left ml-[28px] h-6 w-1" />
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn([
                        'ch-border-outline ml-[20px] h-4 w-4 rounded-full',
                      ])}
                    />

                    <div>
                      {/* TODO: Load if user selects action */}
                      {loadingActionResponse && (
                        <p className="text-xs text-green-300">
                          <TypedComponent strings={['Processing request...']} />
                        </p>
                      )}
                      {!loadingActionResponse && actionResponse?.data && (
                        <p className="ch-body">Output generated</p>
                      )}
                    </div>
                  </div>
                  <div className="ch-border-left ml-[28px] h-6 w-1" />
                </div>
                <StructuredDataDisplay />
              </>
            )}
          </div>

          <div className="col-span-4">
            <HistorySheet />
            <ObserverControls />

            {html && (
              <>
                <div id="observer-actions-prestep">
                  <div className="ch-border-left ml-[28px] h-6 w-1" />
                  <div className="flex items-center space-x-2">
                    <div className="ml-[20px] h-4 w-4 animate-pulse rounded-full border border-green-500" />
                    <div>
                      <p className="text-xs text-green-300">
                        Observatory is active
                      </p>
                    </div>
                  </div>
                  <div className="ch-border-left ml-[28px] h-6 w-1" />
                </div>
                <ObserverActions />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
