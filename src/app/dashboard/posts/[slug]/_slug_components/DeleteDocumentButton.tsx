'use client'
import { ChButtonPrimary } from '@chroniconl/ui/button'
import { toast } from '@chroniconl/ui/use-toast'

export default function DeleteDocumentButton({ id }: { id: string }) {
  const handleDeleteDocumentPrompt = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this document?',
    )
    if (!confirm) {
      toast({
        title: 'Error',
        description: 'Document was not deleted.',
        variant: 'destructive',
      })
      return
    }

    // Delete the document
    const deleteDocument = async () => {
      try {
        const response = await fetch('/api/v0/document/delete', {
          method: 'DELETE',
          body: JSON.stringify({ id }),
        })
        const { error } = await response.json()

        if (error) {
          toast({
            title: 'Error',
            description: 'There was an error deleting the document.',
            variant: 'destructive',
          })
          return
        }

        toast({
          title: 'Success',
          description: 'Document was deleted.',
        })
        window.location.href = '/dashboard/posts'
      } catch (error) {
        toast({
          title: 'Error',
          description: 'There was an error deleting the document.',
          variant: 'destructive',
        })
      }
    }

    deleteDocument()
  }

  return <ChButtonPrimary onClick={handleDeleteDocumentPrompt}>Delete</ChButtonPrimary>
}
