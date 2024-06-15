import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function AuthButtons() {
	return (
		<nav className="flex gap-12 items-center">
			<SignedIn>
				<Link href="/dashboard" className="h-11 rounded-md px-8 bg-[#CC0000] text-white flex items-center font-bold text-lg">
					My Dashboard
				</Link>
			</SignedIn>
			<SignedOut>
				<Link href="/sign-in" className="h-11 rounded-md px-8 bg-[#CC0000] text-white flex items-center font-bold text-lg">
					Sign In
				</Link>
			</SignedOut>
		</nav>
	);
}
