"use client";

import { NAVIGATION_ITEMS, type NavigationItem } from "@/constants";
import { cn } from "@/utils/cn";

interface NavigationBarProps {
  variant?: "desktop" | "mobile";
  onItemClick?: () => void;
  className?: string;
}

export const NavigationBar = ({ variant = "desktop", onItemClick, className }: NavigationBarProps) => {
  const baseItemClasses = "text-white/90 hover:text-white transition-colors duration-200";

  const itemClasses = cn(baseItemClasses, variant === "desktop" ? "hover:underline" : "block py-2");

  const navClasses = cn(variant === "desktop" ? "hidden lg:flex items-center space-x-8" : "space-y-3", className);

  return (
    <nav className={navClasses}>
      {NAVIGATION_ITEMS.map((item: NavigationItem) => (
        <a key={item.name} href={item.href} className={itemClasses} onClick={onItemClick}>
          {item.name}
        </a>
      ))}
    </nav>
  );
};

export { NAVIGATION_ITEMS } from "@/constants";
