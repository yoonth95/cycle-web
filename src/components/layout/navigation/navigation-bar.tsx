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
  const sortedMenuData = sortMenuData(menuData || []);

  const handleMove = (item: NavigationItem) => {
    if (item.type === "single") router.push(item.link);
  };

  return (
    <nav>
      <ul className="hidden items-center lg:flex">
        {sortedMenuData &&
          sortedMenuData.map((item) => (
            <motion.li
              key={item.id}
              className={cn("group", "px-4 py-5", "cursor-pointer font-medium duration-200")}
              onClick={() => handleMove(item)}
            >
              <h3 className="text-white transition-colors duration-300 group-hover:text-white">
                {item.slug}
              </h3>
              <div className="relative top-[5px] h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
              <HoverDropdownMenu menuItem={item} />
            </motion.li>
          ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
