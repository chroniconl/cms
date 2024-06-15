import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";

export async function GET (request: Request) {
	const { data, error } = await supabase
		.from("authors")
		.select("*");

	if (error) {
		console.error(error);
		return failResponse(error?.message);
	}

	return okResponse(data);
}

export async function PUT (request: Request) {
	const requestData = await request.json();
	const { error } = await supabase
		.from("avatars")
		.update({
			first_name: requestData.first_name,
			last_name: requestData.last_name,
			display_name: requestData.display_name,
			avatar: requestData.avatar,
			last_updated: new Date(),
		})
		.match({ id: requestData.id });

	if (error) {
		console.error(error);
		return failResponse(error?.message);
	}

	return okResponse("Author updated");
}

export async function POST(request: Request) {
	const requestData = await request.json();
	const { error } = await supabase
		.from("avatars")
		.insert({
			first_name: requestData.first_name,
			last_name: requestData.last_name,
			display_name: requestData.display_name,
			avatar: requestData.avatar,
		})

	if (error) {
		console.error(error);
		return failResponse(error?.message);
	}

	return okResponse("Author created");
}
