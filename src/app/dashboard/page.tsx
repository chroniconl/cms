import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { Info } from "lucide-react";

export default async function DashboardPage() {
	const user = await currentUser();
	const { data, error } = await supabase
		.from("users")
		.select(`orgs (*)`)
		.eq("user_id", user?.id)
		.single();

	if (error) {
		console.error(error);
		return <div>Error fetching orgs</div>;
	}

	return (
		<>
			<Heading>Welcome</Heading>

			<section className="mt-10 mb-20 p-5 bg-secondary rounded-md">
				<Info className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
				<Heading level={2}>Scheduled Posts</Heading>
				<Text>Coming Soon. We're working on this section</Text>
			</section>

			<section className="mt-10 mb-20 p-5 bg-secondary rounded-md">
				<Info className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
				<Heading level={2}>Recent Comments</Heading>
				<Text>Coming Soon. We're working on this section</Text>
			</section>
		</>
	);
}
