import { formatDate } from "@/utils/dates";
import { Category } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/utils/cn";

export default function PostCard({
	title,
	date,
	slug,
	tags,
	category
}: {
	title: string;
	date: string;
	slug: string;
	tags?: string;
	category?: Category;
}) {
	return (
		<article key={slug} className="flex flex-col items-start justify-between">
			<Link
				href={slug}
				className={cn([
					"grid grid-cols-12 gap-4",
					"w-full group p-4 rounded-lg",
					"bg-secondary hover:bg-stone-100 dark:hover:bg-stone-800",
					"transition-colors duration-200 ease-in-out"
				])}
			>
				<div id="meta-section" className="col-span-12 md:col-span-9">
					<Heading className="mb-2" level={3}>{title}</Heading>
					<div className="flex space-x-2">
						<span className={cn("chroniconl-p text-sm")}>
							{"Posted on "}
							<time dateTime={date}>{formatDate(date)}</time>
						</span>
					</div>
				</div>

				<div id="tags-section" className="col-span-12 md:col-span-3">
					<div>
						<div className="flex flex-wrap gap-4">
							{tags?.split(",").map((tag) => (
								<span
									key={tag}
									className={cn([
										"inline-block px-2 py-1 text-xs font-semibold rounded-md mt-2",
										"bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
									])}
								>
									{tag.replace(/\b\w/g, (char) => char.toUpperCase())}
								</span>
							))}
						</div>
						<div className="flex flex-wrap gap-4">
							{category?.name && (
								// @ts-ignore 
								<Badge variant={category.color} className="mt-2">
									{category.name}
								</Badge>
							)}
						</div>
					</div>
				</div>
			</Link>
		</article>
	);
}
