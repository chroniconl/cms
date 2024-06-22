import { supabase } from "@/utils/supabase"
import ClientPlacementForm from "./PlacementForm.client"

export default async function ServerPlacementForm({ 
	id,
	headlinePost
}: { 
	id: string;
	headlinePost: boolean 
}) {
	const { data, error } = await supabase
		.from("posts")
		.select("id, title, headline_post");

	if (error) {

		console.log(error)
		return <>Error fetching post</>;
	}

	return (
		<ClientPlacementForm
			id={id}
			posts={data}
			headlinePost={headlinePost}
		/>
	)
}