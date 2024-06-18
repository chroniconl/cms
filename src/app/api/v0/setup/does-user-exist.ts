import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return failResponse("User not found");
  }

  // Check if the user exists in the database
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    console.error(error);
    return failResponse(error?.message);
  }

  // If the user exists, return a 200 status code
  if (data.length > 0) {
    return okResponse(data[0], "User exists");
  }

  // If the user does not exist, create a new user in the database
  const { data: newUser, error: newUserError } = await supabase
    .from("users")
    .insert({
      user_id: user?.id,
      provider: "clerk",
    });

  if (newUserError) {
    console.error(newUserError);
    return failResponse(newUserError?.message);
  }

  return okResponse(newUser, "User created");
}
