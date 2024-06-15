import { formatSlug } from "@/utils/formatSlug";
import { bypassOkResponse, failResponse, okResponse, skirtFailedResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import { currentUser } from '@clerk/nextjs/server';

async function createDocumentWithTitle(title: string): Promise<any> {
	try {
		const user = await currentUser();

		if (!user) {
			console.error('Missing user');
			return;
		}

		const { data: userData, error: userError } = await supabase
			.from("users")
			.select("*")
			.eq("user_id", user?.id)
			.single();

		if (userError) {
			console.error(userError);
			return;
		}

		const { data, error } = await supabase
			.from("posts")
			.insert({
				title: title,
				content: "<p>Nothing here yet</p>",
				slug: formatSlug(title),
				user_id: userData?.id
			})
			.select()

		if (error) {
			if (error.code === "23505") {
				return skirtFailedResponse("Document with that title already exists");
			}

			console.error(error);
			return skirtFailedResponse("Failed to create document");
		}
		return bypassOkResponse(data[0].slug);
	}

	catch (error) {
		console.error(error);
		return skirtFailedResponse("Failed to create document");
	}
}

export async function POST(request: Request) {
	const data = await request.json();


	const responseObject = await createDocumentWithTitle(data.title);

	if (responseObject?.error === true) {
		return failResponse(responseObject.message);
	}

	return okResponse(responseObject.data);

}