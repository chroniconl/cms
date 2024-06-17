import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";

export const getPostsAction = async (current: number = 0, next: number = 10) => {
	const user = await currentUser();
	const { data: userData, error: userError } = await supabase
		.from("users")
		.select("*")
		.eq("user_id", user?.id)
		.single();

	if (userError) {
		return []
	}

	const { data, error, count } = await supabase
		.from("posts")
		.select(`*, category:categories(id, name, slug, color)`, { count: "exact" })
		.order("created_at", { ascending: false })
		.eq("user_id", userData?.id)
		.range(current, next)
		.limit(10);

	if (error) {
		console.error(error);
	}

	return {
		data,
		count: count as number,
		next: next + 10,
		current: next,
	};
}