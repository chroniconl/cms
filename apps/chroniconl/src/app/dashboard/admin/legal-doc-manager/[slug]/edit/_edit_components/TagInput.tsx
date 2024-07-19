'use client'

import { useState } from 'react'
import { Label } from '@repo/ui/label'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { Badge } from '@repo/ui/badge'
import { XIcon } from 'lucide-react'

export default function TagInput() {
  const [tags, setTags] = useState([
    { id: 1, name: 'how-to' },
    { id: 2, name: 'nice' },
    { id: 3, name: 'how-to' },
  ])
  const [tagInput, setTagInput] = useState('')
  const addTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, { id: Date.now(), name: tagInput.trim() }])
      setTagInput('')
    }
  }

  const removeTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags</Label>
      <p className="text-sm text-muted-foreground">
        Tags are used to help categorize your post. They are comma separated.
      </p>
      <Input
        id="tag-input"
        placeholder="Add a tag"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTag()}
      />
      <div className="mt-2 flex flex-wrap gap-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="ch-border-outline flex items-center bg-accent pl-2"
          >
            <span className="text-xs">{tag.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTag(tag.id)}
            >
              <XIcon className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
