import MediaUploadForm from '@/app/dashboard/media/_media_components/MediaUploadForm'
import MediaView from '@/app/dashboard/media/_media_components/MediaView'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Info } from 'lucide-react'
export default async function ConsoleMedia() {
  return (
    <section className="mb-20 mt-6 rounded-md bg-secondary p-5">
      <Info className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
      <Heading level={2}>Media</Heading>
      <Text>Coming Soon. We're working on this section</Text>
    </section>
  )
}
