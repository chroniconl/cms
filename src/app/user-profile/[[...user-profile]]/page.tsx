import { TemplateLayout } from "@/components/general/TemplateLayout";
import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
	<TemplateLayout>
		<div className="w-fit mx-auto mt-20">
			<UserProfile path="/user-profile" />
		</div>
	</TemplateLayout>
);

export default UserProfilePage;
