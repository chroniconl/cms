import PublicLayout from "@/components/general/PublicLayout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<PublicLayout>
			<div className="w-fit mx-auto my-20">
				<SignIn path="/sign-in" />
			</div>
		</PublicLayout>
	);
}
