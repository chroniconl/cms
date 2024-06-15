import { Heading } from "@/components/ui/heading";
import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";

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
		</>
	);
}
