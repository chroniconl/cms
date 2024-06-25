import { formatDate, isPublished } from "@/utils/dates";
import { Category } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/utils/cn";
import { ClientImage } from "@/components/ui/image";

export default function PostCard({
	title,
	date,
	slug,
	tags,
	category,
	publishDate,
	imageUrl,
	imageAlt,
	description,
}: {
	title: string;
	date: string;
	slug: string;
	tags?: string;
	category?: Category;
	publishDate?: string;
	imageUrl?: string;
	imageAlt?: string;
	description?: string;
}) {
	const publishedChecker = (publishDate: string): boolean => {
		return publishDate ? isPublished(publishDate) : false;
	};
	const published = publishedChecker(publishDate as string);
	return (
		<article key={slug} className="flex flex-col items-start justify-between">
			<Link
				href={slug}
				className={cn([
					"grid grid-cols-12 gap-4",
					"w-full group p-4 rounded-md",
					"bg-secondary",
					"transition-colors duration-200 ease-in-out",
				])}
			>
				<div className="col-span-12 md:col-span-4">
					<div className="border border-stone-200 dark:border-stone-700 ">
						<ClientImage
							className="input-border"
							src={imageUrl}
							alt={imageAlt}
						/>
					</div>
				</div>
				<div id="meta-section" className="col-span-12 md:col-span-6">
					<h2 className="font-bold text-xl">{title}</h2>
					<div className="flex space-x-2">
						<span className={cn("chroniconl-p text-sm")}>
							{"Posted on "}
							<time dateTime={date}>{formatDate(date)}</time>
						</span>

						{published && (
							<span className={cn("chroniconl-p text-sm")}>{"Published"}</span>
						)}
					</div>
				</div>

				<div className="col-span-12 md:col-span-2">
					<div className="flex md:justify-end">
						{category?.name && (
							// @ts-ignore
							<Badge variant={category.color}>{category.name}</Badge>
						)}
					</div>
				</div>
			</Link>
		</article>
	);
}
