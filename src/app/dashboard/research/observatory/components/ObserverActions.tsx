'use client'
import { Text } from '@/components/text'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { url } from 'inspector'
import { useObservatoryStore } from '../store'
import { toast } from '@/components/ui/use-toast'
import { ChButtonPrimary } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { BorderBottom } from '@/components/BorderBottom'

export const ObserverActions = () => {
  const html = useObservatoryStore((state) => state.html)
  const setJobResponse = useObservatoryStore((state) => state.setJobResponse)
  const ogUrl = useObservatoryStore((state) => state.url)
  const setPrompt = useObservatoryStore((state) => state.setPrompt)
  const prompt = useObservatoryStore((state) => state.prompt)
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

  const suggestions = [
    {
      prompt: 'Extract all links from the HTML content',
      url: '/api/v1/trendy/observatory-link-extract',
    },
    // TODO: Add these back in once they're ready
    {
      prompt: 'Extract all images from the HTML content',
      url: '/api/v1/trendy/observatory-image-extract',
    },
    {
      prompt: 'Extract all script tags from the HTML content',
      url: '/api/v1/trendy/observatory-script-extract',
    },
    {
      prompt: 'Extract all stylesheets from the HTML content',
      url: '/api/v1/trendy/observatory-stylesheet-extract',
    },
    {
      prompt: 'Gather all metadata (e.g., title, description)',
      url: '/api/v1/trendy/observatory-metadata-extract',
    },
  ]

  const handleClick = async (url: string) => {
    // TODO: Validate URL
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        raw_contents: html,
        og_url: ogUrl,
      }),
    })

    const { data, error } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to extract links',
        variant: 'destructive',
      })
      return
    }

    setJobResponse(data.links)
  }

  const handleGenerate = async () => {
    setLoadingActionResponse(true)
    const response = await fetch('/api/v1/trendy/observatory-action', {
      method: 'POST',
      body: JSON.stringify({
        html_content: html,
        type: 'custom',
        prompt: prompt,
      }),
    })

    const { data, error } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate action',
        variant: 'destructive',
      })
      return
    }

    setActionResponse(data)
    setLoadingActionResponse(false)
  }

  return (
    <div className="ch-border-outline p-4">
      <div>
        <h2 className="font-bold text-white">Quick Actions</h2>
      </div>

      <ScrollArea className="ch-border mt-4 flex h-40 flex-col divide-y divide-stone-200/50 overflow-auto rounded-md dark:divide-stone-700/50">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.prompt}
            onClick={() => handleClick(suggestion.url)}
            className="p-2 text-left text-xs hover:bg-accent hover:text-accent-foreground"
          >
            <Text>{suggestion.prompt}</Text>
          </button>
        ))}
      </ScrollArea>

      <div className="my-8 flex w-full items-center justify-center">
        <p className="text-xs text-stone-500">Or, ask AI to generate</p>
      </div>

      <div className="flex w-full flex-col">
        <Label htmlFor="prompt">Ask AI</Label>
        <Textarea
          placeholder="Enter a prompt..."
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-end">
        <ChButtonPrimary className="w-fit" onClick={handleGenerate}>
          Generate
        </ChButtonPrimary>
      </div>
    </div>
  )
}
