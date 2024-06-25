import { SearchHeader } from "@/components/general/header/SearchHeader";
import Avatar from "@/components/general/Avatar";
import Link from "next/link";

const navItems = [
	{ label: "Dashboard", url: "/dashboard" },
	{ label: "Posts", url: "/dashboard/posts" },
	{ label: "Media", url: "/dashboard/media" },
	{ label: "Settings", url: "/dashboard/settings" },
	{ label: "Docs", url: "/documentation" },
];

export default async function DashboardHeader() {
	return (
		<header className="px-4 h-[80px] flex items-center w-full">
			<div className="flex items-center gap-4 w-full">
				<div className="flex flex-grow">
					{navItems.map(({ label, url }) => (
						<Link
							key={label}
							href={url}
							className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary"
						>
							{label}
						</Link>
					))}
				</div>
				<div className="flex items-center gap-4 flex-grow-0">
					<SearchHeader />
					<Avatar />
				</div>
			</div>
		</header>
	);
}
