import { cn } from "@/utils/cn";
import { bangers } from "@/app/fonts";
import { LinkAsButton } from "@/components/ui/button";

export default function FullScreenMessage({
	eyebrow,
	title,
	description,
	actionLabel,
	actionHref,
}: {
	eyebrow: string;
	title: string;
	description: string;
	actionLabel: string;
	actionHref: string;
}) {
	return (
		<section className="flex flex-col items-center justify-center pt-20 pb-40">
			<p className="text-base font-semibold text-stone-800 dark:text-stone-300">{eyebrow}</p>
			<h2
				className={cn([
					"mt-4 text-6xl text-stone-950 dark:text-stone-200 font-bold tracking-[3px]",
					bangers.className,
				])}
			>
				{title}
			</h2>
			<p className="mt-4 text-base text-stone-600 dark:text-stone-400">
				{description}
			</p>
			<LinkAsButton href={actionHref} className="mt-4" variant="outline" size="lg">
				{actionLabel}
			</LinkAsButton>
		</section>
	);
}
