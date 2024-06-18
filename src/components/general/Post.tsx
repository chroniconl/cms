import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Time } from "@/components/general/Time";
import { Text } from "@/components/ui/text";
import TipTap from "@/components/general/TipTap";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
import { ClientImage } from "@/components/ui/image";

interface PostProps {
	title: string;
	description: string;
	content: string;
	date: string;
	slug: string;
	tags: string;
	category: string;
	imageUrl: string | null;
	imageAlt: string | null;
}
export default function Post({
	title,
	description,
	content,
	date,
	slug,
	tags,
	category,
	imageUrl,
	imageAlt
}: PostProps) {
	return (
		<article className="group bg-secondary p-6 shadow-md rounded-md">
			<ClientImage src={imageUrl} alt={imageAlt} />
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
	imageUrl,
	imageAlt,
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
	imageUrl: string | null;
	imageAlt: string | null;
}) => {
	return (
		<Link href={`/blog/${formatTimestampToSlug(publish_date)}/${slug}`}>
			<article className="group">
				<ClientImage src={imageUrl} alt={imageAlt} />
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