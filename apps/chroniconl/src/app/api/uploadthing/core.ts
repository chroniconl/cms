import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/utils/supabase'
import { sign } from 'crypto'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const { userId } = auth()

      // If you throw, the user will not be able to upload
      if (!userId) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log(metadata)
      // console.log(file)
      const { error } = await supabase.from('photo_refs').insert({
        id: file.key,
        name: file.name,
        image_url: file.url,
        image_key: file.key,
        size: file.size,
      })

      if (error) {
        console.error(error)
        return
      }

      // This code RUNS ON YOUR SERVER after upload
      // !!! Whatever is returned here is sent to the client side `onClientUploadComplete` callback
      return {
        uploadedBy: metadata.userId,
        url: file.url,
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
