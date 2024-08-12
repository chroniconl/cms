'use client'
import { ChButtonSecondary } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useObservatoryStore } from '../store'
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react'

export const StructuredDataDisplay = () => {
  const html = useObservatoryStore((state) => state.html)
  const contentPreviewType = useObservatoryStore(
    (state) => state.contentPreviewType,
  )
  const headHtml = useObservatoryStore((state) => state.headHtml)
  const bodyHtml = useObservatoryStore((state) => state.bodyHtml)
  const copiedToClipboard = useObservatoryStore(
    (state) => state.copiedToClipboard,
  )
  const setCopiedToClipboard = useObservatoryStore(
    (state) => state.setCopiedToClipboard,
  )
  const setLoadingActionResponse = useObservatoryStore(
    (state) => state.setLoadingActionResponse,
  )
  const setActionResponse = useObservatoryStore(
    (state) => state.setActionResponse,
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
    <div id="observatory-unstructured-data" className="relative">
      {actionResponse && (
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

      {actionResponse?.type && actionResponse.type === 'custom' && (
        <div
          contentEditable
          className="ch-card max-h-[300px] min-h-[300px] w-full overflow-y-auto rounded-md p-4 text-xs"
        >
          {actionResponse?.data}
        </div>
      )}

      {!actionResponse && actionResponse?.type !== 'custom' && (
        <div
          contentEditable
          className="ch-card max-h-[300px] min-h-[300px] w-full overflow-y-auto rounded-md p-4 text-xs"
        >
          There's nothing to display here.
        </div>
      )}
    </div>
  )
}
