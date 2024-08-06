'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function PostTitleInput({
  postId,
  value,
}: {
  postId: string
  value?: string
}) {
  const handleChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const response = await fetch('/api/v0.2/post-title', {
      method: 'PUT',
      body: JSON.stringify({
        postId: postId,
        title: ev.target.value,
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
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        name="title"
        placeholder="Enter a title"
        className="w-full"
        defaultValue={value}
        onChange={handleChange}
      />
    </div>
  )
}
