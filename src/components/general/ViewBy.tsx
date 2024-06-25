import Link from "next/link"

interface Tag {
	name: string;
	count: number;
	href: string;
}

export default function ViewBy({
	type = "tags",
	data = {}
}: {
	type?: "tags" | "categories",
	data?: {
		[key: string]: {
			count: number;
			slug: string;
			name: string;
		};
	}
}) {
	return (
		<section className="py-12">
			<h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">All {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
			<p className="mt-4 text-muted-foreground">Click on a {type === "tags" ? "tag" : "category"} to view all posts associated with it.</p>
			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{data && Object.keys(data).map((item) => (
					<Link
						key={data[item].name}
						href={`/${type}/${data[item].slug}`}
						className="group block overflow-hidden rounded-lg border border-muted bg-background p-4 transition-all hover:border-primary hover:bg-primary/10"
						prefetch={false}
					>
						<h3 className="text-lg font-semibold group-hover:text-primary">{data[item].name}</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							{data[item].count} post{data[item].count !== 1 ? "s" : ""}
						</p>
					</Link>
				))}
			</div>
		</section>
	)
}