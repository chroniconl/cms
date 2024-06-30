import { ClientImage } from '@/components/ui/image'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'

export default function MediaView({ media }: { media: {
	id: string
	name: string
	image_url: string
	image_key: string
	size: number
}[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2 px-4">
        <Heading level={2}>Media Gallery</Heading>
        <Text>
          Here you can view all the images you have uploaded to your account.
        </Text>
      </div>
      <div className="mb-12 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3">
        {media && media.map(({ id, name, image_url, size }) => (
            <div
              key={id}
              className="group flex flex-col gap-2 rounded-md border border-stone-200 bg-white p-2 shadow-sm hover:shadow-md dark:border-stone-800 dark:bg-stone-950"
            >
							<ClientImage 
								src={image_url} 
								alt={name}
							/>
              <div className="flex items-center justify-between gap-2">
                <Text small className="line-clamp-1 text-sm font-medium">
                  {name}
                </Text>
                <Text small className='whitespace-nowrap'>
									{(size / 1000000).toFixed(2)} MB
								</Text>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
