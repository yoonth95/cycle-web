"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { sortSubItems } from "@/utils/navigation-utils";
import { NavigationItem } from "@/types/navigation-data";

const HoverDropdownMenu = ({ menuItem }: { menuItem: NavigationItem }) => {
  return (
    <>
      {menuItem.type === "group" && (
        <div
          className={cn(
            "absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg z-40",
            "transition-all duration-300 ease-out",
            "opacity-0 pointer-events-none",
            "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
            "cursor-default",
          )}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold border-b border-gray-200 pb-2">
                  <Link
                    href={menuItem.link}
                    className="text-figma-alizarin-crimson hover:text-figma-alizarin-crimson/80 transition-colors duration-200"
                  >
                    {menuItem.slug}
                  </Link>
                </h2>
                <div>
                  <ul className="space-y-2">
                    {sortSubItems(menuItem.items).map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.link}
                          className="text-gray-600 hover:text-figma-alizarin-crimson transition-colors duration-200 block my-4 text-sm border-l-2 border-transparent hover:border-figma-alizarin-crimson pl-3"
                        >
                          {item.slug}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HoverDropdownMenu;
