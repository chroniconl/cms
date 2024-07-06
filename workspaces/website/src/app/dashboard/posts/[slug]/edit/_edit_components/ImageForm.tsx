'use client'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { UploadDropzone } from '@/components/general/UploadThingys'
import { useMetaFormStore } from '../_edit_state/metaFormStore'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function ImageForm({
  id: props__id,
  imageUrl: props__imageUrl,
  imageId: props__imageId,
  imageAlt: props__imageAlt,
  imageCaption: props__imageCaption,
}: {
  id: string
  imageUrl: string | null
  imageId: string | null
  imageAlt: string | null
  imageCaption: string | null
}) {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      imageAlt: props__imageAlt || '',
      imageCaption: props__imageCaption || '',
    },
  })
  const state__imageUrl =
    useMetaFormStore((state) => state.imageUrl) || props__imageUrl
  const state__setImageUrl = useMetaFormStore((state) => state.setImageUrl)
  const state__imageId =
    useMetaFormStore((state) => state.imageId) || props__imageId
  const state__setImageId = useMetaFormStore((state) => state.setImageId)

  const handleDeleteImage = async () => {
    if (!state__imageId) {
      return
    }
    const response = await fetch('/api/v0/document/image-delete', {
      method: 'DELETE',
      body: JSON.stringify({
        id: props__id,
        imageId: state__imageId,
      }),
    })

    const { error, message } = await response.json()
    if (error) {
      return
    }

    state__setImageUrl(null)
    state__setImageId(null)

    setValue('imageAlt', '')
    setValue('imageCaption', '')

    toast({
      title: 'Image deleted',
      description: 'The image has been deleted.',
    })
  }

  const onSubmit = async (data: { imageAlt: string; imageCaption: string }) => {
    const response = await fetch('/api/v0/document/image-meta', {
      method: 'PUT',
      body: JSON.stringify({
        id: props__id,
        image_alt: data.imageAlt,
        image_caption: data.imageCaption,
      }),
    })

    const { error } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description:
          'Something went wrong updating the images metadata. Please try again later.',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Image updated',
      description: 'The image has been updated.',
    })
  }

  const handleUploadImageComplete = async (files: any) => {
    const response = await fetch('/api/v0/document/image-upload', {
      method: 'PUT',
      body: JSON.stringify({
        image_url: files[0].url,
        image_id: files[0].key,
        id: props__id,
      }),
    })

    const { data, error } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      })
      return
    }

    state__setImageUrl(data.image_url)
    state__setImageId(data.image_id)

    toast({
      title: 'Image uploaded',
      description: 'The image has been uploaded.',
    })
  }

  const handleUploadError = (error: Error) => {
    let errorMessage = error.message
    if (error.message.includes('FileSizeMismatch')) {
      errorMessage = 'The file size is too large'
    }

    toast({
      title: 'Image upload failed',
      description: errorMessage,
      variant: 'destructive',
    })
  }

  const imageAlt = watch('imageAlt')

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mb-4 flex w-full justify-between px-4 pt-6">
          <Heading level={3}>{'Image'}</Heading>
          {state__imageUrl && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will not be able to
                    recover this image from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteImage}>
                    Yes, I'm sure
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <div className="px-4 pb-6">
          {state__imageUrl ? (
            <div className="flex flex-col gap-2">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={state__imageUrl}
                  alt={imageAlt || ''}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 flex flex-col gap-2 border-t border-stone-200 pt-4 dark:border-stone-700"
              >
                <div>
                  <Label htmlFor="imageAlt">Alt text</Label>
                  <Controller
                    name="imageAlt"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input type="text" placeholder="Alt text" {...field} />
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="imageCaption">Image caption</Label>
                  <Controller
                    name="imageCaption"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Photo by ..."
                        {...field}
                      />
                    )}
                  />
                </div>
                <Button className="mt-4" type="submit">
                  Update Image Meta
                </Button>
              </form>
            </div>
          ) : (
            <UploadDropzone
              className="border border-input bg-background px-2.5 py-6 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadImageComplete}
              onUploadError={handleUploadError}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
