import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";
import DashboardHeader from "./DashboardHeader";

export default async function DashboardShell({
  children,
}: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user) {
    return <div>Please sign in</div>;
  }

  const { error: upsertError } = await supabase.from("users").upsert(
    {
      user_id: user?.id,
      provider: "clerk",
    },
    { onConflict: "user_id" },
  );

  if (upsertError) {
    console.error(upsertError);
    return <div>Error creating or fetching user</div>;
  }

  return (
    <div className="relative isolate flex min-h-svh w-full flex-col bg-white lg:bg-stone-100 dark:bg-stone-900 dark:lg:bg-stone-950">
      <DashboardHeader />
      <main className="flex flex-1 flex-col pb-3 lg:px-3">
        <div className="grow px-4 py-6 md:px-6 lg:rounded-md lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-stone-950/5 dark:lg:bg-stone-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  );
}
