'use client'
import Image from 'next/image'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { cn } from '@/utils/cn'

export function ClientImage({ src, alt, className, ...props }: any) {
  if (!src) {
    return null
  }
  return (
    <AspectRatio
      ratio={16 / 9}
      className={cn('rounded-md bg-muted', className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-md object-cover"
        {...props}
      />
    </AspectRatio>
  )
}
