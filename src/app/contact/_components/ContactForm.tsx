import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
	return (
		<section className="w-full max-w-2xl mx-auto py-12 md:py-16">
			<div className="space-y-4 text-center">
				<h2 className="text-3xl font-bold">Get in Touch</h2>
				<p className="text-stone-500 dark:text-stone-400">
					Have a project in mind? Fill out the form and I'll get back to you as
					soon as possible.
				</p>
			</div>
			<form className="mt-8 space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" placeholder="Your name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" placeholder="Your email" type="email" />
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone">Phone</Label>
					<Input id="phone" placeholder="Your phone number" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="message">Message</Label>
					<Textarea
						className="min-h-[120px]"
						id="message"
						placeholder="Tell me about your project"
					/>
				</div>
				<Button className="w-full" type="submit">
					Submit
				</Button>
			</form>
		</section>
	);
}
