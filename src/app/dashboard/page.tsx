import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Info } from "lucide-react";

export default async function DashboardPage() {
  return (
    <>
      <Heading>Welcome</Heading>

      <section className="mt-10 mb-10 p-5 bg-secondary rounded-md">
        <Info className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        <Heading level={2}>Scheduled Posts</Heading>
        <Text>Coming Soon. We're working on this section</Text>
      </section>

      <section className="mb-10 p-5 bg-secondary rounded-md">
        <Info className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        <Heading level={2}>Recent Comments</Heading>
        <Text>Coming Soon. We're working on this section</Text>
      </section>

			<section className="mb-20 p-5 bg-secondary rounded-md">
        <Info className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        <Heading level={2}>Draft Posts</Heading>
        <Text>Coming Soon. We're working on this section</Text>
      </section>
    </>
  );
}
