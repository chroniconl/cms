import { Badge } from '@repo/ui/badge'
import { Heading } from '@/components/heading'
import { Time } from '@/components/Time'
import TipTap, { proseClassNames } from '@/components/TipTap'
import { ClientImage } from '@/components/image'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import Image from 'next/image'
import { Category } from '@/utils/types'

interface PostProps {
  title: string
  description: string
  content: string
  date: string
  slug: string
  category: Category
  imageUrl: string | null
  imageAlt: string | null
  author: {
    id: string
    display_name: string
    href: string
    avatar_url: string
    twitter_handle: string
  }
}
export default function Post({
  title,
  content,
  date,
  category,
  imageUrl,
  imageAlt,
  author,
}: PostProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <ClientImage src={imageUrl} alt={imageAlt} />
      <div className="mt-4 flex flex-col justify-between group-hover:opacity-75">
        <div>
          <Heading>{title}</Heading>
        </div>
        <div className="mt-1 flex items-center space-x-2.5 text-sm">
          <Time date={date} className="text-stone-500 dark:text-stone-400" />
          <Badge color={category?.color}>{category?.name}</Badge>
        </div>
        {author && (
          <div className="mt-3 flex items-center space-x-2.5 text-sm">
            <Avatar>
              <AvatarImage
                src={author?.avatar_url}
                alt={author?.display_name}
              />
              <AvatarFallback className="h-full w-full">
                {/* placeholder image */}
                <Image
                  src="https://utfs.io/f/d4271cec-49ca-475a-ab84-df354ce7e35a-h5faa7.png"
                  alt="Avatar"
                  width={50}
                  height={50}
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {author?.display_name}
              </span>
              <a
                className="text-xs text-muted-foreground"
                href={'https://x.com/' + author?.twitter_handle}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{author?.twitter_handle}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 flex flex-col justify-between border-t pt-8 dark:border-stone-600">
        <TipTap
          defaultValue={content}
          editable={false}
          className={proseClassNames}
        />
      </div>
    </div>
  )
}
