/**
 * this file is kind of muddy
 *
 * but it works
 */
import { toPST } from "@/utils/dates";
import { formatSlug } from "@/utils/formatSlug";
import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import { tagSeparator } from "@/utils/tagSeparator";
import { currentUser } from "@clerk/nextjs/server";
import joi from "joi";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return failResponse("User not found");
  }

  // Check if the user exists in the database
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (userError) {
    return failResponse("Trouble getting user");
  }

  const requestData = await request.json();

  const schema = joi.object({
    id: joi.string().required(),
    category_id: joi.string().allow("").optional(),
    tags: joi.string().optional(),
  });

  const { error: validationError } = schema.validate(requestData);

  if (validationError) {
    return failResponse(validationError.message);
  }

  // parse tags
  const tags: string[] = tagSeparator(requestData.tags);

  // find the tags that already exist in the database
  const { data: tagsThatExistData, error: tagsThatExistError } = await supabase
    .from("tags")
    .select("id, name")
    .in("name", tags);

  if (tagsThatExistError) {
    return failResponse(tagsThatExistError?.message);
  }

  // Remove any tags that already exist in the database
  const tagsToInsert = tags.filter(
    (tag) => !tagsThatExistData.find((tagData) => tagData.name === tag),
  );

  // create tags in database
  const { data: tagsData, error: tagsError } = await supabase
    .from("tags")
    .upsert(
      tagsToInsert.map((tag) => ({
        name: tag,
        slug: formatSlug(tag),
        last_updated: toPST(new Date()),
        created_by: userData?.id,
      })),
    )
    .select();

  if (tagsError) {
    return failResponse(tagsError?.message);
  }

  // create post_tag_relationship in database
  const { error: postTagRelationshipError } = await supabase
    .from("post_tag_relationship")
    .insert(
      tagsData.map((tag) => ({
        tag_id: tag.id,
        post_id: requestData.id,
        created_by: userData?.id,
      })),
    )
    .select();

  if (postTagRelationshipError) {
    return failResponse(postTagRelationshipError?.message);
  }

  if (requestData.category_id) {
    // Update post with new category_id
    const { error: postError } = await supabase
      .from("posts")
      .update({
        category_id: requestData.category_id,
      })
      .match({ id: requestData.id });

    if (postError) {
      return failResponse(postError?.message);
    }
  }

  return okResponse("Document updated");
}
