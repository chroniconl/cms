import PublicLayout from "@/components/general/PublicLayout";
import FullScreenMessage from "@/components/general/FullScreenMessage";

export default function ThankYou() {
  return (
    <PublicLayout>
      <FullScreenMessage
        eyebrow="Thank you"
        title="Thank you for subscribing"
        description="You will receive a confirmation email shortly. We promise not to spam you."
        actionLabel="Go back home"
        actionHref="/"
      />
    </PublicLayout>
  );
}
