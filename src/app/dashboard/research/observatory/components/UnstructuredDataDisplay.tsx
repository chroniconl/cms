'use client'
import { ChButtonSecondary } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useObservatoryStore } from '../store'
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react'

export const UnstructuredDataDisplay = () => {
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
          {!html &&
            "There's nothing to display here. Enter a URL above to get started."}
        </code>
      </pre>
    </div>
  )
}
