import {supabase} from "@/utils/supabase";
import Post from "@/components/general/Post";
import {getPSTDate} from "@/utils/dates";
import {format} from "date-fns";
import PublicLayout
	from "@/components/general/PublicLayout";

export default async function BlogPage({
	params,
}: {
	params: {
		yy: string;
		mm: string;
		dd: string;
		slug: string;
	};
}) {
	let safeDate: string | null = null;

	const { yy, mm, dd, slug } = params;
	try {
		const year: number = parseInt(yy, 10);
		const month: number = parseInt(mm, 10) - 1; // Correct zero-indexing by subtracting 1
		const day: number = parseInt(dd, 10);

		if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
			new Error('Invalid date');
		}

		const date = new Date(year, month, day);
		safeDate = format(date, 'yyyy-MM-dd');
	} catch (error) {
		console.error(error);
		return <div>Error parsing date</div>;
	}

	if (!safeDate) {
		return <div>Error parsing date</div>;
	}

	const pstDate = getPSTDate();
	const formattedPSTDate = format(pstDate, 'yyyy-MM-dd');
	const formattedPSTTime = format(pstDate, 'HH:mm:ss');

	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('visibility', 'public')
		.eq('slug', slug)
		.lte('publish_date_day', formattedPSTDate)
		.single();

	if (error) {
		console.error(error);
		return <div>Error fetching post</div>;
	}

	console.log(data.publish_date_day, safeDate);

	const postGotPublishedToday = data.publish_date_day === formattedPSTDate;

	// Can't show a post that is going live in a few hours..
	const postGotPublishedTodayWithinTime = data.publish_date_time > formattedPSTTime;
	if (postGotPublishedToday && postGotPublishedTodayWithinTime) {
		return <div>This post is not published yet</div>;
	}

	return (
		<PublicLayout>
			<article className="mx-auto w-full md:max-w-3xl">
				<Post
					title={data?.title}
					date={data?.publish_date}
					slug={data?.slug}
					tags={data?.tags}
					category={data?.category}
					description={data?.description}
					content={data?.content}
					imageUrl={data?.image_url}
					imageAlt={data?.image_alt}
				/>
			</article>
		</PublicLayout>
	);
}
