import { TemplateLayout } from "@/components/general/TemplateLayout";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<TemplateLayout>
			<div className="w-fit mx-auto my-20">
				<SignUp path="/sign-up" />
			</div>
		</TemplateLayout>
	);
}
