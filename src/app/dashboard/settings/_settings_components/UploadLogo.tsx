'use client'
import { toast } from '@/components/ui/use-toast'
import { UploadButton } from '@/components/general/UploadThingys'

export default function UploadLogo() {
  return (
    <div className="mt-2 flex items-start">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          const response = await fetch('/api/v0/document/logo', {
            method: 'PUT',
            body: JSON.stringify({ logo: res[0].url }),
          })
          const { data, error, message } = await response.json()

          if (error) {
            toast({
              title: 'Error',
              description: 'Failed to get orgs. Please try again later.',
              variant: 'destructive',
            })
            return
          }

          toast({
            title: 'Success',
            description: 'Organizations logo uploaded successfully.',
          })
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast({
            title: 'Error',
            description: 'Failed to get orgs. Please try again later.',
            variant: 'destructive',
          })
        }}
      />
    </div>
  )
}
