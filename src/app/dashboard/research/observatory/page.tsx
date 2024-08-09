'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChButtonPrimary } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import BorderBottom from '@/components/BorderBottom'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'

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
    const response = await fetch('/api/v1/trendy', {
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
              <BorderBottom />
            </div>
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <div
                  className="h-[500px] w-full overflow-auto rounded-md border bg-muted-foreground p-4 text-primary-foreground"
                  dangerouslySetInnerHTML={{
                    __html: JSON.parse(JSON.stringify(html)),
                  }}
                />
              </TabsContent>
              <TabsContent value="raw">
                <pre className="h-[500px] w-full overflow-auto rounded-md border bg-muted-foreground p-4 text-primary-foreground">
                  {html}
                </pre>
              </TabsContent>
            </Tabs>
          </div>
          <div className="col-span-4">
            <h3 className="ch-heading ch-primary">History</h3>
            <div className="flex flex-col gap-2">
              <div className="ch-border rounded-md p-2">
                <a href="#" className="text-muted-foreground">
                  <div className="font-medium">Example Website</div>
                  <div className="text-sm">https://example.com</div>
                </a>
              </div>
              <div className="ch-border rounded-md p-2">
                <a href="#" className="text-muted-foreground">
                  <div className="font-medium">Google</div>
                  <div className="text-sm">https://google.com</div>
                </a>
              </div>
              <div className="ch-border rounded-md p-2">
                <a href="#" className="text-muted-foreground">
                  <div className="font-medium">GitHub</div>
                  <div className="text-sm">https://github.com</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
