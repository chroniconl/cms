export const fetchCache = "force-no-store";

import { supabase } from "@/utils/supabase";
import TipTap from "@/components/general/TipTap";
import MetaForm from "./_edit_components/MetaFormV2";
import TitleForm from "./_edit_components/TitleForm";
import { Category } from "@/utils/types";
import { Card } from "@/components/ui/card";
import ImageForm from "./_edit_components/ImageForm";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
import PublishDetailsForm from "./_edit_components/PublishDetailsForm";
import FilterDataForm from "./_edit_components/FilterDataForm";
import ServerPlacementForm from "./_edit_components/PlacementForm.server";
import { toPST } from "@/utils/dates";

export default async function DocumentSlugEdit({
	params,
}: {
	params: {
		slug: string;
	};
}) {
	if (!params.slug) {
		return <>Error fetching post</>;
	}

	const { data, error } = await supabase
		.from("posts")
		.select(`*, category:categories(id, name, slug, color)`)
		.eq("slug", params.slug)
		.single();

	if (error) {
		return <>Error fetching post</>;
	}

	return (
		<>
			<div className="flex w-full">
				<div className="w-full rounded-md">
					<div className="grid grid-cols-12 gap-4 md:gap-6">
						<div className="col-span-12 md:col-span-8 gap-1 prose dark:prose-invert max-w-full flex flex-col">
							<TitleForm title={data.title} id={data.id} />
							<Card className="p-2">
								<TipTap defaultValue={data.content} params={params} />
							</Card>
						</div>
						<div className="h-full col-span-12 md:col-span-4 flex flex-col gap-5">
							{/* pass as props cause server components */}
							<MetaForm
								id={data.id}
								title={data.title}
								description={data.description}
							/>
							<ImageForm
								id={data.id}
								imageUrl={data.image_url}
								imageId={data.image_id}
								imageAlt={data.image_alt}
								imageCaption={data.image_caption}
							/>
							<ServerPlacementForm 
								id={data.id}
								headlinePost={data.headline_post}
							/>
							<PublishDetailsForm
								id={data.id}
								publishDateDay={toPST(data.publish_date_day)}
								publishDateTime={data.publish_date_time}
								visibility={data.visibility}
								headlinePost={data.headline_post}
							/>
							<FilterDataForm
								categories={data.categories}
								tags={data.tags}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
