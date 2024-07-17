'use client'

import { Button, ChButtonPrimary, ChButtonSecondary } from '@chroniconl/ui/button'
import { Dialog, DialogBody, DialogTitle } from '@/components/dialogV2'
import { Label } from '@chroniconl/ui/label'
import { Input } from '@chroniconl/ui/input'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from '@chroniconl/ui/use-toast'

export default function NewDocumentButton() {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const { control, handleSubmit, watch, register } = useForm({
    defaultValues: {
      title: '',
      url: '',
    },
  })

  const createNewPost = async (data: any) => {
    const title = data.title
    const url = data.url

    try {
      const response = await fetch('/api/v0/document/create', {
        method: 'POST',
        body: JSON.stringify({ title, url }),
      })
      const { data: slug, error, message } = await response.json()

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create document',
          variant: 'destructive',
        })
        return
      }

      window.location.href = `/dashboard/posts/${slug}/edit`
    } catch (error) {
      return
    }
  }

  return (
    <>
      <ChButtonPrimary onClick={() => setModalOpen(true)} className="h-fit">
        Create Post
      </ChButtonPrimary>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogBody>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(createNewPost)}
          >
            <div className="flex flex-col">
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                control={control}
                defaultValue={inputValue}
                render={({ field }: any) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter the title of the document"
                  />
                )}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <ChButtonPrimary type="submit" className="w-fit">
                Create Post
              </ChButtonPrimary>
              <ChButtonSecondary
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-fit"
              >
                Cancel
              </ChButtonSecondary>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  )
}
