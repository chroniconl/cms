import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return failResponse("User not found or not signed in");
  }

  const { data, error } = await supabase
    .from("users")
    .select(`
			*,
			api_keys (*)
		`)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return failResponse("Trouble getting api keys");
  }

  return okResponse(data);
}
