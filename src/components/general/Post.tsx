import Link from "next/link";
import { Badge } from "../ui/badge";
import { Heading } from "../ui/heading";
import { Time } from "./Time";
import { Text } from "../ui/text";
import TipTap from "./TipTap";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";

interface PostProps {
	title: string;
	description: string;
	content: string;
	date: string;
	slug: string;
	tags: string;
	category: string;
}
export default function Post({
	title,
	description,
	content,
	date,
	slug,
	tags,
	category
}: PostProps) {
	return (
		<article className="group bg-secondary p-6 shadow-md rounded-lg">
			<div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-md">
				<img
					src="https://plus.unsplash.com/premium_photo-1718198501646-a95f049e39b5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Featured Article"
					width={1920}
					height={1080}
					className="object-cover object-center group-hover:opacity-75"
				/>
			</div>
			<div className="mt-4 flex flex-col justify-between group-hover:opacity-75">
				<div>
					<Heading>
						{title}
					</Heading>
					<Text className="mt-2">
						{description}
					</Text>
				</div>
				<div className="mt-3 flex items-center text-sm">
					<Time date={date} />
					<Badge className="mx-1 rounded-full bg-stone-200 px-2 py-1 text-xs font-semibold text-stone-800">
						{category}
					</Badge>
				</div>
			</div>
			<div className="border-t dark:border-stone-600 mt-12 pt-8 flex flex-col justify-between">
				<TipTap
					defaultValue={content}
					editable={false}
					className="prose dark:prose-invert prose-li:py-1 prose:w-full prose-p:0.5 prose-stone prose-lg max-w-full"
				/>
			</div>
		</article>
	)
}

export const PostCardDefaultSize = ({
	title,
	description,
	date,
	slug,
	tags,
	category,
	publish_date,
}: {
	title: string;
	description: string;
	date: string;
	slug: string;
	tags: string;
	category: {
		name: string;
		color: string;
	}
	publish_date: string;
}) => {
	return (
		<Link href={`/blog/${formatTimestampToSlug(publish_date)}/${slug}`}>
			<article className="group">
				<div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-stone-100 shadow-md">
					<img
						src="https://plus.unsplash.com/premium_photo-1718198501646-a95f049e39b5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Article Thumbnail"
						width={640}
						height={360}
						className="object-cover object-center group-hover:opacity-75"
					/>
				</div>
				<div className="mt-4 flex flex-col justify-between">
					<div>
						<Heading className="text-base font-bold text-stone-900">
							{title}
						</Heading>
						<Text className="mt-2 text-sm text-stone-500 line-clamp-2" small>
							{description.slice(0, 200)}
						</Text>
					</div>
					<div className="mt-3 flex items-center text-sm">
						<Badge color={category.color}>
							{category.name}
						</Badge>
					</div>
				</div>
			</article>
		</Link>
	)
}