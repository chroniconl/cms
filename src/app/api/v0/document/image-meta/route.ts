import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";

export async function PUT(request: Request) {
	const requestData = await request.json();

	if (!requestData.id) {
		return failResponse("Document ID is required");
	}

	if (!requestData.image_alt || !requestData.image_caption) {
		return failResponse("Nothing to update");
	}

	// Remove from Supabase
	const { error } = await supabase
		.from("posts")
		.update({
			image_caption: requestData.image_caption,
			image_alt: requestData.image_alt,
		})
		.match({ id: requestData.id });


	if (error) {
		console.error(error);
		return failResponse(error?.message);
	}

	return okResponse({
		image_alt: requestData.image_alt,
		image_caption: requestData.image_caption,
	}, "Documents image meta updated");
}
