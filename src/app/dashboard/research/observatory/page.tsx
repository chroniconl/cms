'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChButtonPrimary } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import BorderBottom from '@/components/BorderBottom'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/dates'
import { Card } from '@/components/ui/card'

export default async function Page() {
  return (
    <div className="mx-auto w-full">
      <Screen />
    </div>
  )
}

const Screen = () => {
  const [url, setUrl] = useState('')
  const [html, setHtml] = useState('')

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

    setHtml(data?.content)

    toast({
      title: 'Success',
      description: 'HTML fetched successfully',
    })
  }

  return (
    <div className="min-h-dvh flex-1">
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold">Observatory (Preview)</h2>
              <p className="text-muted-foreground">
                Enter a URL to fetch the HTML to begin exploring the site.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url" className="sr-only">
                Enter URL
              </Label>
              <Input
                id="url"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <ChButtonPrimary className="mt-2" onClick={handleFetchHTML}>
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
                <div
                  className="ch-border max-h-[500px] min-h-[300px] w-full overflow-auto rounded-md p-4 text-primary-foreground"
                  dangerouslySetInnerHTML={{
                    __html: JSON.parse(JSON.stringify(html)),
                  }}
                />
              </TabsContent>
              <TabsContent value="raw">
                <pre className="ch-border max-h-[500px] min-h-[300px] w-full overflow-auto rounded-md p-4 text-xs">
                  <code>{html}</code>
                </pre>
              </TabsContent>
            </Tabs>
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
  const [history, setHistory] = useState<any[]>([])

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
      <div className="max-h-[500px] space-y-4 overflow-y-auto p-1">
        {history.map((item) => (
          <div key={item.id} className="ch-border-outline p-4">
            <p className="ch-body ch-primary">{item.page_title}</p>
            <p className="ch-body">{item.full_url}</p>
            <p className="ch-body ch-muted">{formatDate(item.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
