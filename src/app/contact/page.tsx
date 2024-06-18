import ContactForm from "./_components/ContactForm";
import { TemplateLayout } from "@/components/general/TemplateLayout";

export const metadata = {
  title: "Contact Me",
  description:
    "Contact me for any reason, including business inquiries, questions, or just to say hi!",
};

export default async function ContactPage() {
  return (
    <TemplateLayout>
      <div className="mt-10 mx-4">
        <ContactForm />
      </div>
    </TemplateLayout>
  );
}
