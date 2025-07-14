"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HoverDropdownMenu from "./hover-dropdown-menu";
import { cn } from "@/lib/utils";
import { sortMenuData } from "@/utils/navigation-utils";
import { NavigationProps } from "@/types/navigation-props";
import { NavigationItem } from "@/types/navigation-data";

const NavigationBar = ({ menuData }: NavigationProps) => {
  const router = useRouter();
  const sortedMenuData = sortMenuData(menuData);

  const handleMove = (item: NavigationItem) => {
    if (item.type === "single") router.push(item.link);
  };

  return (
    <nav>
      <ul className="hidden lg:flex items-center">
        {sortedMenuData.map((item) => (
          <motion.li
            key={item.id}
            className={cn("group", "px-4 py-5", "duration-200 font-medium cursor-pointer")}
            onClick={() => handleMove(item)}
          >
            <h3 className="text-white group-hover:text-white transition-colors duration-300">
              {item.slug}
            </h3>
            <div className="h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 relative top-[5px]"></div>
            <HoverDropdownMenu menuItem={item} />
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
