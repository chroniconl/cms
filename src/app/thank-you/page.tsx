import { Header } from "@/components/general/outside/Header";
import { Footer } from "@/components/general/outside/Footer";
import Link from "next/link";

export default function ThankYou() {
	return (
		<>
			<Header />
			<div className="w-full">
				<div className="mx-auto max-w-7xl lg:px-8 flex justify-center h-full items-center py-16 sm:py-32 md:py-64">
					<div className="flex flex-col items-center justify-center">
						<p className="text-center text-base font-semibold text-stone-400 dark:text-stone-500">
							Thank you for subscribing to our newsletter
						</p>
						<h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-800 sm:text-5xl dark:text-stone-100">
							Thank you for subscribing
						</h1>
						<p className="mt-4 text-base text-stone-600 dark:text-stone-400">
							You will receive a confirmation email shortly. We promise not to spam you.
						</p>
						<Link href="/" className="mt-4">
							Go back home
						</Link>
					</div>
				</div>
			</div>
			<Footer 
				hideNewsletter
			/>
		</>
	);
}
