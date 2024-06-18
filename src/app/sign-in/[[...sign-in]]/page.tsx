import { TemplateLayout } from "@/components/general/TemplateLayout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <TemplateLayout>
      <div className="w-fit mx-auto my-20">
        <SignIn path="/sign-in" />
      </div>
    </TemplateLayout>
  );
}
