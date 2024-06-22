export const fetchCache = "force-no-store";

import MetaForm from "./_edit_components/MetaFormV2";
import TitleForm from "./_edit_components/TitleForm";
import ImageForm from "./_edit_components/ImageForm";
import PublishDetailsForm from "./_edit_components/PublishDetailsForm";
import FilterDataForm from "./_edit_components/FilterDataForm";
import TipTap from "@/components/general/TipTap";
import { Card } from "@/components/ui/card";
import { supabase } from "@/utils/supabase";
import { toPST } from "@/utils/dates";

export default async function DocumentSlugEdit({
	params,
}: {
	params: {
		slug: string;
	};
}) {
	try {
		const [postResult, categoriesResult, authorsResult] = await Promise.all([
			supabase
				.from("posts")
				.select(`*, category:categories(id, name, slug, color)`)
				.eq("slug", params.slug)
				.single(),
			supabase
				.from("categories")
				.select(`*`),
			supabase
				.from("authors")
				.select(`*`)
		]);

		const { data: postData, error: postError } = postResult;
		const { data: categoriesData, error: categoriesError } = categoriesResult;
		const { data: authorsData, error: authorsError } = authorsResult;

		if (postError) {
			return <>Error fetching post</>;
		}

		if (categoriesError) {
			return <>Error fetching categories</>;
		}

		if (authorsError) {
			return <>Error fetching authors</>;
		}

		const { data: tagsData, error: tagsError } = await supabase
			.from("post_tag_relationship")
			.select(`tag:tags(id, name, slug)`)
			.eq("post_id", postData.id)

		if (tagsError) {
			console.error(tagsError)
			return <>Error fetching tags</>;
		}

		const formattedTags = tagsData.map((tag) => ({ 
			// @ts-ignore - this is dumb I'm right TS wrong.
			name: tag.tag?.name,
			// @ts-ignore
			slug: tag.tag?.slug,
			// @ts-ignore
			id: tag.tag?.id 
		}))

		console.log(formattedTags)
		
		// Use postData and categoriesData as needed
		return (
			<>
				<div className="flex w-full">
					<div className="w-full rounded-md">
						<div className="grid grid-cols-12 gap-4 md:gap-6">
							<div className="col-span-12 md:col-span-8 gap-1 prose dark:prose-invert max-w-full flex flex-col">
								<TitleForm title={postData.title} id={postData.id} />
								<Card className="p-2">
									<TipTap defaultValue={postData.content} params={params} />
								</Card>
							</div>
							<div className="h-full col-span-12 md:col-span-4 flex flex-col gap-5">
								{/* pass as props cause server components */}
								<MetaForm
									id={postData.id}
									title={postData.title}
									description={postData.description}
									authors={authorsData}
									author_id={postData.author_id}
								/>
								<ImageForm
									id={postData.id}
									imageUrl={postData.image_url}
									imageId={postData.image_id}
									imageAlt={postData.image_alt}
									imageCaption={postData.image_caption}
								/>
								<PublishDetailsForm
									id={postData.id}
									publishDateDay={toPST(postData.publish_date_day)}
									publishDateTime={postData.publish_date_time}
									visibility={postData.visibility}
									headlinePost={postData.headline_post}
								/>
								<FilterDataForm
									id={postData.id}
									categories={categoriesData}
									tags={formattedTags}
									category={postData.category}
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} catch (error) {
		return <>Error executing queries</>;
	}
}
