import { toPST } from "@/utils/dates";
import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import joi from "joi";

interface PublishDetailsApiProps {
	id: string;
	visibility?: string;
	publishDateDay?: Date;
	publishDateTime?: string;
}
export async function PUT(request: Request) {
	const requestData = await request.json() as PublishDetailsApiProps;

	const schema = joi.object({
		id: joi.string().required(),
		visibility: joi.string().optional(),
		publishDateDay: joi.date().optional(),
		publishDateTime: joi.string().optional(),
	});

	const { error: validationError } = schema.validate(requestData);

	if (validationError) {
		return failResponse(validationError.message);
	}

	const { error } = await supabase
		.from("posts")
		.update({
			visibility: requestData?.visibility || null,
			publish_date_day: requestData?.publishDateDay ? toPST(requestData?.publishDateDay) : null,
			publish_date_time: requestData?.publishDateTime || null,
		})
		.match({ id: requestData?.id });

	if (error) {
		console.error(error);
		return failResponse(error?.message);
	}

	return okResponse("Document updated");
}
