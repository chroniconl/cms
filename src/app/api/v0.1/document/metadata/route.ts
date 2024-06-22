import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import joi from "joi";

export async function PUT(request: Request) {
  const requestData = await request.json();

  const schema = joi.object({
    id: joi.string().required(),
		title: joi.string().optional(),
    description: joi.string().optional(),
		author: joi.string().optional(),
  });

  const { error: validationError } = schema.validate(requestData);

  if (validationError) {
    return failResponse(validationError.message);
  }

  const { error } = await supabase
    .from("posts")
    .update({
			title: requestData?.title || null,
      description: requestData?.description || null,
			// author: requestData?.author || "",
    })
    .match({ id: requestData?.id });

  if (error) {
    console.error(error);
    return failResponse(error?.message);
  }

  return okResponse("Document updated");
}
