import PublicLayout from "@/components/general/PublicLayout";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<PublicLayout>

			<SignUp path="/sign-up" />

		</PublicLayout>
	);
}
