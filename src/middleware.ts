import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const options = {
	debug:
		process.env.DEV === "development" || process.env.NODE_ENV === "development",
};

export default clerkMiddleware(async (auth, request) => {
	// https://clerk.com/docs/references/nextjs/clerk-middleware#protect-routes-based-on-user-authorization-status
	if (isProtectedRoute(request)) auth().protect();
}, options);

export const config = {
	matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
