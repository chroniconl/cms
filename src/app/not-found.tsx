import { cn } from "@/utils/cn";
import Link from "next/link";
import { bangers } from "./fonts";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="mx-auto max-w-7xl lg:px-8 flex h-full items-center pt-16 sm:pt-32">
        <div className="flex flex-col items-center justify-center">
          <p className="text-base font-semibold text-stone-800">404</p>
          <h2
            className={cn([
              "mt-4 text-6xl text-stone-950 font-bold tracking-[3px]",
              bangers.className,
            ])}
          >
            Page not found
          </h2>
          <p className="mt-4 text-base text-stone-600 dark:text-stone-400">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <Link href="/" className="mt-4 cta-button">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
