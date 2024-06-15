import { Footer } from "@/components/general/outside/Footer";
import { Header } from "@/components/general/outside/Header";

export function TemplateLayout({
	children,
}: {
	children: React.ReactNode;
	landing?: boolean;
}) {
	return (
		<div className="flex w-full flex-col min-h-screen">
			<Header />
			<main className="flex-auto">{children}</main>
			<Footer />
		</div>
	);
}
