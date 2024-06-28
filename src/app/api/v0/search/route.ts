import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";
import joi from "joi";

export async function POST(request: Request) {
	const user = await currentUser();

	if (!user) {
		return failResponse("User not found");
	}

	const requestData = await request.json();

	const schema = joi.object({
		search: joi.string().required(),
		include_titles: joi.boolean().optional(),
		include_content: joi.boolean().optional(),
	});

	const { error: validationError } = schema.validate(requestData);

	if (validationError) {
		return failResponse(validationError.message);
	}

	const { search, include_titles, include_content } = requestData;

	if (!search) {
		return failResponse("No search term provided.");
	}

	let results: any[] = [];

	if (include_titles) {
		const { data: titleSearchResults, error: titleSearchError } = await supabase
			.from("posts")
			.select("*")
			.textSearch("title", search);

		if (titleSearchError) {
			return failResponse(titleSearchError.message);
		}

		results = [...results, ...titleSearchResults];
	}

	if (include_content) {
		const { data: contentSearchResults, error: contentSearchError } = await supabase
			.from("posts")
			.select("*")
			.textSearch("content", search);

		if (contentSearchError) {
			return failResponse(contentSearchError.message);
		}

		results = [...results, ...contentSearchResults];
	}

	return okResponse({
		searchResults: results,
		searchResultCount: results.length,
	});
}