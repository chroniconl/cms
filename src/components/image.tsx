'use client'
import Image from 'next/image'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { cn } from '@/utils/cn'

export function ClientImage({
  src,
  alt,
  className,
  aspectRatio,
  ...props
}: any) {
  if (!src) {
    return null
  }
  return (
    <AspectRatio
      ratio={aspectRatio || 16 / 9}
      className={cn('rounded-md', className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-fit rounded-md"
        {...props}
      />
    </AspectRatio>
  )
}
