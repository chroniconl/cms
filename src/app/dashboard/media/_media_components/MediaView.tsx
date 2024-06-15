import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function MediaView() {
	return (
		<div className="flex flex-col gap-4">
			<div className="px-4 flex items-center gap-2 py-6">
				<SearchIcon className="w-5 h-5 text-muted-foreground" />
				<Input
					className="w-full"
					placeholder="Search images..."
					type="search"
				/>
			</div>
			<div className="space-y-2 px-4">
				<h2 className="text-2xl font-bold">Media Gallery</h2>
				<p className="text-stone-500 dark:text-stone-400">
					Here you can view all the images you have uploaded to your account.
				</p>
			</div>
			<div className="mb-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{
					// array with 10 items
					Array.from({ length: 10 }).map((_, index) => (
						<div
							key={index}
							className="group flex flex-col gap-2 rounded-lg border border-stone-200 bg-white p-2 shadow-sm hover:shadow-md dark:border-stone-800 dark:bg-stone-950"
						>
							<div className="relative aspect-video overflow-hidden rounded-md">
								<img
									alt="Image Preview"
									className="object-cover transition-all group-hover:scale-110"
									height={300}
									src="https://source.unsplash.com/random/?Zoo,Animals"
									style={{
										aspectRatio: "500/300",
										objectFit: "cover",
									}}
									width={500}
								/>
							</div>
							<div className="flex items-center justify-between gap-2">
								<div className="line-clamp-1 text-sm font-medium">
									image_{index}.jpg
								</div>
								<div className="text-xs text-muted-foreground">1.2 MB</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
}
