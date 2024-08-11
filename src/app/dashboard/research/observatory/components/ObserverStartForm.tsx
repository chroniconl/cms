'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChButtonPrimary } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useObservatoryStore } from '../store'

export const ObserverStartForm = () => {
  const url = useObservatoryStore((state) => state.url)
  const setUrl = useObservatoryStore((state) => state.setUrl)
  const setHtml = useObservatoryStore((state) => state.setHtml)
  const setHeadHtml = useObservatoryStore((state) => state.setHeadHtml)
  const setBodyHtml = useObservatoryStore((state) => state.setBodyHtml)

  const setLoadingUrlResponse = useObservatoryStore(
    (state) => state.setLoadingUrlResponse,
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

  return (
    <div id="observatory-form" className="flex flex-col">
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
  )
}
