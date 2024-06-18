export const fetchCache = "force-no-store";

import { supabase } from "@/utils/supabase";
import TipTap from "@/components/general/TipTap";
import MetaForm from "./_edit_components/MetaForm";
import TitleForm from "./_edit_components/TitleForm";
import { Category } from "@/utils/types";
import { Card } from "@/components/ui/card";
import ImageForm from "./_edit_components/ImageForm";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";

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
            <div className="h-full col-span-12 md:col-span-4">
              {/* pass as props cause server components */}
              <MetaForm
                id={data.id}
                visibility={data.visibility}
                description={data.description}
                createdAt={data.created_at}
                publishDate={data.publish_date}
                currentCategory={data.category as Category}
                slug={
                  process.env.NEXT_PUBLIC_SITE_URL +
                  `/blog/${formatTimestampToSlug(data.publish_date)}/${
                    data.slug
                  }`
                }
              />
              <div className="mt-4 bg-secondary rounded-md">
                <ImageForm
                  id={data.id}
                  imageUrl={data.image_url}
                  imageId={data.image_id}
                  imageAlt={data.image_alt}
                  imageCaption={data.image_caption}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
