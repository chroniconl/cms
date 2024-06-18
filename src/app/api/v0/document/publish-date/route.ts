import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import joi from "joi";

export async function PUT(request: Request) {
  const requestData = await request.json();

  if (!requestData.id) {
    return failResponse("Document ID is required");
  }

  const schema = joi.object({
    id: joi.string().required(),
    publish_date: joi.date().required(),
  });

  const { error: validationError } = schema.validate(requestData);

  if (validationError) {
    return failResponse(validationError.message);
  }

  const { error } = await supabase
    .from("posts")
    .update({
      publish_date: requestData.publish_date,
    })
    .match({ id: requestData.id });

  if (error) {
    console.error(error);
    return failResponse(error?.message);
  }

  return okResponse("Documents publish date updated");
}
