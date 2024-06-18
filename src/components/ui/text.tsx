import { clsx } from "clsx";
import { firaSansCondensed } from "@/app/fonts";

export function Text({
  className,
  small = false,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <p
      data-slot="text"
      {...props}
      className={clsx(
        className,
        "text-stone-500 dark:text-stone-400",
        small ? "text-sm" : "text-base md:text-lg",
        firaSansCondensed.className,
      )}
    >
      {children}
    </p>
  );
}

export function Code({
  className,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        "rounded border border-stone-950/10 bg-stone-950/[2.5%] px-0.5 text-sm font-medium text-stone-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white",
      )}
    />
  );
}
