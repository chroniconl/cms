import { toPST } from "@/utils/dates";
import { bypassOkResponse, failResponse, okResponse, skirtFailedResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import { PostResponseTypes } from "@/utils/types";
import joi from "joi";

interface HeadlinePostApiProps {
	id: string;
}

export async function PUT(request: Request) {
  // Get incoming request data
	const requestData = await request.json() as HeadlinePostApiProps;

	// Validate incoming request data
  const schema = joi.object({id: joi.string().required()});
  const { error: validationError } = schema.validate(requestData);
  
	if (validationError) {
		return failResponse(validationError.message);
	}

	// Check if we can make the post a headline post
	// It has to be a public post and has to have a publish date past the current date
	const { data: checkHeadlinePostData, error: checkHeadlinePostError } = await supabase
		.from("posts")
		.select("*")
		.eq("id", requestData?.id)		
		.single();

	if (checkHeadlinePostError) {
		return failResponse("Document is not public or has not been published yet");
	}

	// Check if the post is already a headline post
	if (checkHeadlinePostData?.visibility !== "public") {
		return failResponse("Document is not public");
	}

	console.log("DATE:" + toPST(checkHeadlinePostData?.publish_date_day))
	console.log("DATE:" + toPST(new Date()))
	// Check if the publish date is in the future
	if (toPST(checkHeadlinePostData?.publish_date_day) < toPST(new Date())) {
		console.log("publish date is in the past")
		return failResponse("Document has not been published yet");
	}

	// There should only be one headline post at any given time, 
	// so we'll set the headline_post to false for all posts first
	const { error: updateExistingError } = await supabase
    .from("posts")
    .update({ headline_post: false })
    .eq("headline_post", true);
	
		if (updateExistingError) {
		return failResponse("Error updating headline post");
	}
	

	// Now we'll set the headline_post to true for the post the user provided in the request
  const { error: updateNewError } = await supabase
    .from("posts")
    .update({
			headline_post: true
    })
    .match({ id: requestData?.id });

  if (updateNewError) {
    return failResponse(updateNewError?.message);
  }

  return okResponse("Document updated");
}
