"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";

function ThemeToggler({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const switchToLightMode = () => {
    setTheme("light");
  };

  const switchToDarkMode = () => {
    setTheme("dark");
  };

  const switchToSystemDefault = () => {
    setTheme("system");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Theme</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button
            type="button"
            onClick={switchToLightMode}
            className={className}
          >
            Light Mode
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            type="button"
            onClick={switchToDarkMode}
            className={className}
          >
            Dark Mode
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            type="button"
            onClick={switchToSystemDefault}
            className={className}
          >
            System Default
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggler;
