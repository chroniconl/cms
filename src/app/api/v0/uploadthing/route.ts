import { utapi } from "@/server/utapi";
import { colorClassNames } from "@/utils/colorClassNames";
import { formatSlug } from "@/utils/formatSlug";
import { failResponse, okResponse } from "@/utils/response";
import { supabase } from "@/utils/supabase";
import joi from "joi";

export async function GET(request: Request) {
  const files = await utapi.listFiles();

  return okResponse(files, "Heres your files");
}
