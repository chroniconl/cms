'use client'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function PostDescriptionTextarea({
  postId,
  value,
}: {
  postId: string
  value?: string
}) {
  const handleChange = async (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const response = await fetch('/api/v0.2/post-description', {
      method: 'PUT',
      body: JSON.stringify({
        postId: postId,
        description: ev.target.value,
      }),
    })

    const { error, message } = await response.json()
    if (error) {
      console.error(message)
      return
    }
  }

  return (
    <div className="flex flex-col">
      <Label htmlFor="description">Description</Label>
      <Textarea
        name="description"
        placeholder="Enter a description"
        className="w-full"
        defaultValue={value}
        onChange={handleChange}
      />
    </div>
  )
}
