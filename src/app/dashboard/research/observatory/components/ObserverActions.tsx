'use client'
import { Text } from '@/components/text'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { url } from 'inspector'
import { useObservatoryStore } from '../store'
import { toast } from '@/components/ui/use-toast'

export const ObserverActions = () => {
  const html = useObservatoryStore((state) => state.html)
  const setJobResponse = useObservatoryStore((state) => state.setJobResponse)
  const ogUrl = useObservatoryStore((state) => state.url)
  const suggestions = [
    {
      prompt: 'Extract all links from the HTML content',
      url: '/api/v1/trendy/observatory-link-extract',
    },
    // TODO: Add these back in once they're ready
    // {
    //   prompt: 'Extract all images from the HTML content',
    //   url: '/api/v1/trendy/observatory-image-extract',
    // },
    // {
    //   prompt: 'Extract all script tags from the HTML content',
    //   url: '/api/v1/trendy/observatory-script-extract',
    // },
    // {
    //   prompt: 'Extract all stylesheets from the HTML content',
    //   url: '/api/v1/trendy/observatory-stylesheet-extract',
    // },
    // {
    //   prompt: 'Gather all metadata (e.g., title, description)',
    //   url: '/api/v1/trendy/observatory-metadata-extract',
    // },
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

  return (
    <div className="ch-border-outline p-4">
      <div>
        <h2 className="font-bold text-white">Quick Actions</h2>
      </div>

      <ScrollArea className="ch-border mt-4 flex h-72 flex-col divide-y divide-stone-200/50 overflow-auto dark:divide-stone-700/50">
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
    </div>
  )
}
