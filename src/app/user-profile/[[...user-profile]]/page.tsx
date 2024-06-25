import PublicLayout from "@/components/general/PublicLayout";
import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
	<PublicLayout>
		<div className="w-fit mx-auto mt-20">
			<UserProfile path="/user-profile" />
		</div>
	</PublicLayout>
);

export default UserProfilePage;
