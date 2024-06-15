import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";

export async function POST(request: Request) {
	// TODO - add Joi validation
	const requestData = await request.json();
	const searchTerm = requestData.search;

	if (!searchTerm) {
		return failResponse("No search term provided.");
	}

	const { data: titleSearchResults, error: titleSearchError } = await supabase
		.from("posts")
		.select("*")
		.textSearch("title", searchTerm);

	if (titleSearchError) {
		return failResponse(titleSearchError.message);
	}

	const { data: contentSearchResults, error: contentSearchError } = await supabase
		.from("posts")
		.select("*")
		.textSearch("content", searchTerm);

	if (contentSearchError) {
		return failResponse(contentSearchError.message);
	}

	const results = {
		...titleSearchResults,
		...contentSearchResults
	}

	return okResponse({
		searchResults: results,
		searchResultCount: Object.keys(results).length,
	});
}
