import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function HeaderLoginButtons() {
	return (
		<>
			<SignedIn>
				<Link href="/dashboard" className="h-11 rounded-md px-8 bg-indigo-500 text-white flex items-center font-bold">
					Dashboard
				</Link>
			</SignedIn>
			<SignedOut>
				<Link href="/sign-in" className="h-11 rounded-md px-8 bg-indigo-500 text-white flex items-center font-bold">
					Sign In
				</Link>
			</SignedOut>
		</>
	);
}
