import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { getPSTDate, getPSTDaySevenDaysFromNow } from "@/utils/dates";
import { format } from "date-fns";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

async function ComingSoon() {
	const pstDate = getPSTDate();
	const pstDateSevenDaysFromNow = getPSTDaySevenDaysFromNow();

	const formattedPSTDate = format(pstDate, "yyyy-MM-dd");
	const formattedPSTDateSevenDaysFromNow = format(pstDateSevenDaysFromNow, "yyyy-MM-dd");

	const { data, error } = await supabase
		.from("posts")
		.select("*, category:categories(id, name, slug, color)")
		.eq("visibility", "public")
		.gte("publish_date_day", formattedPSTDate)
		.lte("publish_date_day", formattedPSTDateSevenDaysFromNow)
		.order("publish_date_day", { ascending: false })
		.limit(6);

	if (error) {
		throw Error();
	}

	return (
		<Card className="w-full mt-6">
			<CardHeader>
				<CardTitle>Upcoming Posts</CardTitle>
				<CardDescription>Here's what you've got scheduled for the next 7 days.</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				{data && data.length ? data?.map((post, i) => (
					<Link
						key={post.id}
						className="flex items-center justify-between h-12 hover:bg-stone-50 dark:hover:bg-stone-800 px-4 border border-stone-200 dark:border-stone-700 rounded-md"
						href={`/dashboard/posts/${post.slug}`}
					>
						<div className="font-medium">{post.title}</div>
						<div className="text-sm text-muted-foreground">{post?.publish_date_day}</div>
					</Link>
				)) : <div>No posts scheduled for the next 7 days</div>}
			</CardContent>
		</Card>
	)
}

async function DraftPosts() {
	const { data, error } = await supabase
		.from("posts")
		.select("*, category:categories(id, name, slug, color)")
		.eq("visibility", "draft")
		.order("publish_date_day", { ascending: false })
		.limit(6);

	if (error) {
		throw Error();
	}

	return (
		<Card className="w-full mt-6">
			<CardHeader>
				<CardTitle>Draft Posts</CardTitle>
				<CardDescription>These are posts that are currently in the draft stage.</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				{data && data.length ? data?.map((post, i) => (
					<Link
						key={post.id}
						className="flex items-center justify-between h-12 hover:bg-stone-50 dark:hover:bg-stone-800 px-4 border border-stone-200 dark:border-stone-700 rounded-md"
						href={`/dashboard/posts/${post.slug}`}
					>
						<div className="font-medium">{post.title}</div>
						<div className="text-sm text-muted-foreground">{post?.publish_date_day}</div>
					</Link>
				)) : <div>No posts scheduled for the next 7 days</div>}
			</CardContent>
		</Card>
	)
}


export default async function DashboardPage() {
	return (
		<section>
			<Heading>Welcome</Heading>
			<ComingSoon />
			<DraftPosts />
		</section>
	);
}
