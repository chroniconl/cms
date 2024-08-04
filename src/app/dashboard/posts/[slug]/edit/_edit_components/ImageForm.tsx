'use client'
import Image from 'next/image'
import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/heading'
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
import { Card } from '@/components/ui/card'
import FileUploader from '@/components/FileUploader'
import { useState } from 'react'

export default function ImageForm({
  documentId: props__documentId,
  imageUrl: props__imageUrl,
  imageId: props__imageId,
  imageAlt,
}: {
  documentId: string
  imageUrl: string | null
  imageId: string | null
  imageAlt: string | null
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(props__imageUrl)
  const [imageId, setImageId] = useState<string | null>(props__imageId)

  const handleDeleteImage = async () => {
    if (!imageId) {
      return
    }
    const response = await fetch('/api/v0/document/image-delete', {
      method: 'DELETE',
      body: JSON.stringify({
        id: props__documentId,
        imageId: imageId,
      }),
    })

    const { error } = await response.json()
    if (error) {
      return
    }

    setImageUrl(null)
    setImageId(null)

    toast({
      title: 'Image deleted',
      description: 'The image has been deleted.',
    })
  }

  const handleUploadImage = async (files: File[]) => {
    try {
      const formData = new FormData()
      formData.append('image', files[0])
      formData.append('id', props__documentId)

      const response = await fetch('/api/v0.2/upload-document-image', {
        method: 'POST',
        body: formData,
      })

      const { data, error, message } = await response.json()

      if (error) {
        return toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        })
      }

      setImageUrl(data.url)
      setImageId(data.image_id)

      toast({
        title: 'Image uploaded',
        description: 'The image has been uploaded.',
      })
    } catch (error) {
      console.log('Upload error:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again later.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mb-4 flex w-full justify-between px-4 pt-6">
          <Heading level={3}>Image</Heading>
          {imageUrl && imageUrl?.length > 0 && (
            <AlertToDeleteImage handleDeleteImage={handleDeleteImage} />
          )}
        </div>
        <div className="px-4 pb-6">
          {imageUrl && typeof imageUrl === 'string' && imageUrl?.length > 0 ? (
            <div className="flex flex-col gap-2">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={imageUrl}
                  alt={imageAlt || ''}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          ) : (
            <FileUploader
              dropZoneLabel="Drag & drop an image here"
              onFileDrop={handleUploadImage}
              onFileChange={handleUploadImage}
              limit={1}
            />
          )}
        </div>
      </Card>
    </div>
  )
}

const AlertToDeleteImage = ({
  handleDeleteImage,
}: {
  handleDeleteImage: () => void
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" aria-label="Delete image">
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete image</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will not be able to recover this
            image from the database.
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
  )
}
