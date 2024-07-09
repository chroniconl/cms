import Link from 'next/link'
import { Badge } from '@chroniconl/ui/badge'
import { Heading } from '@/components/heading'
import { Time } from '@/components/Time'
import { Text } from '@/components/text'
import TipTap from '@/components/TipTap'
import { formatTimestampToSlug } from '@/utils/formatTimestampToSlug'
import { ClientImage } from '@/components/image'
import { Avatar, AvatarFallback, AvatarImage } from '@chroniconl/ui/avatar'
import Image from 'next/image'
import { Category } from '@/utils/types'
import { Card } from '@chroniconl/ui/card'

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
  description,
  content,
  date,
  category,
  imageUrl,
  imageAlt,
  author,
}: PostProps) {
  return (
    <Card>
      <ClientImage src={imageUrl} alt={imageAlt} />
      <div className="mt-4 flex flex-col justify-between group-hover:opacity-75">
        <div>
          <Heading>{title}</Heading>
          <Text className="mt-2">{description}</Text>
        </div>
        <div className="mt-6 flex items-center space-x-2.5 text-sm">
          <Time date={date} />
          <Badge color={category?.color}>{category?.name}</Badge>
        </div>
        <div className="mt-3 flex items-center space-x-2.5 text-sm">
          <Avatar>
            <AvatarImage src={author?.avatar_url} alt={author?.display_name} />
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
            <span className="text-sm font-medium">{author?.display_name}</span>
            <span className="text-xs text-muted-foreground">
              @{author?.twitter_handle}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-between border-t pt-8 dark:border-stone-600">
        <TipTap
          defaultValue={content}
          editable={false}
          className="prose:w-full prose-p:0.5 prose prose-lg prose-stone max-w-full dark:prose-invert prose-li:py-1"
        />
      </div>
    </Card>
  )
}
