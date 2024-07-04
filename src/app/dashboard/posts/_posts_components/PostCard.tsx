import Link from 'next/link'
import { format } from 'date-fns'
import { getPSTDate, isPublished } from '@/utils/dates'
import { ClientPostType, SafePost } from '@/utils/types'
import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/ui/heading'
import { cn } from '@/utils/cn'
import { ClientImage } from '@/components/ui/image'
import { Text } from '@/components/ui/text'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { EyeIcon, MoreVertical, PencilIcon, TrashIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PostCard({
	title = '',
	createdAt,
	content,
	slug = { base: '', public: '', share: '' },
	visibility,
	description,
	publishDateTime,
	publishDateDay,
	formattedPublishDate,
	isPublished,
	userId,
	imageUrl,
	imageAlt,
	imageCaption,
	imageId,
	author = { id: '', displayName: '', href: '', avatarUrl: '', twitterHandle: '' },
	category = { id: '', name: '', slug: '', color: '' },
	tags = []
}: SafePost) {

	return (
		<div className="flex">
			<div
				className={cn([
					'grid grid-cols-12 gap-4',
					'group w-full rounded-md p-4',
					'transition-colors duration-200 ease-in-out',
				])}
			>
				<div
					className={cn([
						"col-span-12 md:col-span-4",
					])}
				>
					{
						imageUrl ? (
							<ClientImage
								className="input-border"
								src={imageUrl}
								alt={imageAlt || ''}
							/>
						) : (
							<div className="w-full h-full rounded-md -rotate-45 flex items-center justify-center">

								<Heading level={4}>{'No image'}</Heading>
							</div>
						)
					}
				</div>
				<div className="col-span-12 md:col-span-8">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className='w-full truncate'>
									<Heading level={4} className='truncate'>{title}</Heading>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>{title}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<div className="grid grid-cols-12 gap-x-2 mt-1">
						{category?.name && (
							<div className="col-span-12 mb-2.5">
								{/* @ts-ignore */}
								<Badge variant={category.color}>{category.name}</Badge>
							</div>
						)}

						<div className="col-span-3">
							<Text small>{'Created on '}</Text>
						</div>
						<div className="col-span-9">
							<Text small>
								{format(getPSTDate(createdAt), 'PPP')}
							</Text>
						</div>

						{formattedPublishDate && (
							<>
								<div className="col-span-3">
									<Text small>
										{'Published '}
									</Text>
								</div>
								<div className="col-span-9">
									<Text small>
										{format(formattedPublishDate, 'PPP')}
									</Text>
								</div>
							</>
						)}

						{tags.length > 0 && (
							<>
								<div className="col-span-3">
									<Text small>
										{'Tags '}
									</Text>
								</div>
								<div className="col-span-9">
									<div className="flex flex-wrap items-center gap-2">
										{tags.map((tag, i) => (
											<>
												<Text small>
													<Link key={tag.id} href={`/dashboard/posts/${tag.slug}`}>
														{tag.name}
														{tags[i + 1] && ', '}
													</Link>
												</Text>
											</>
										))}
									</div>
								</div>
							</>
						)}

						{author?.id && (
							<>
								<div className="col-span-3">
									<Text small>
										{'Author '}
									</Text>
								</div>
								<div className="col-span-9 mt-3 flex items-center space-x-2.5 text-sm">
									<Avatar>
										<AvatarImage src={author?.avatarUrl} alt={author?.displayName} />
										<AvatarFallback className="h-full w-full">
											{/* placeholder image */}
											<Image
												src={author?.avatarUrl}
												alt="Avatar"
												width={50}
												height={50}
											/>
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="text-sm font-medium">{author?.displayName}</span>
										<span className="text-xs text-muted-foreground">
											@{author?.twitterHandle}
										</span>
									</div>
								</div>
							</>
						)}


					</div>
				</div>
			</div>

			<div className="w-[48px] pt-4">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant="ghost" className="h-fit">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link
								href={slug.public}
								className="flex items-center space-x-2 rounded-md px-1 py-0.5 text-sm font-medium"
							>
								<EyeIcon className="h-4 w-4" />
								<span>View</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href={`/dashboard/posts/${slug.base}/edit`}
								className="flex items-center space-x-2 rounded-md px-1 py-0.5 text-sm font-medium"
							>
								<PencilIcon className="h-4 w-4" />
								<span>Edit</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href={slug.share}
								className="flex items-center space-x-2 rounded-md px-1 py-0.5 text-sm font-medium"
							>
								<TrashIcon className="h-4 w-4" />
								<span>Delete</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
