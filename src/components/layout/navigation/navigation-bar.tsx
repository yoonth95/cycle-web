"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { HoverDropdownMenu } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";
import { sortMenuData } from "@/utils/navigation-utils";
import { useNavigationStore } from "@/stores/navigation-store";
import { NavigationProps, NavigationItem } from "@/types/navigation";

const NavigationBar = ({ menuData }: NavigationProps) => {
  const router = useRouter();
  const sortedMenuData = sortMenuData(menuData || []);
  const { activeDropdownId, setActiveDropdown } = useNavigationStore(
    useShallow((state) => ({
      activeDropdownId: state.activeDropdownId,
      setActiveDropdown: state.setActiveDropdown,
    })),
  );

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
              onMouseEnter={() => setActiveDropdown(item.id.toString())}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <h3 className="text-white transition-colors duration-300 hover:text-white">
                {item.slug}
              </h3>
              <div
                className={cn(
                  "relative top-[5px] h-[2px] bg-white transition-all duration-300",
                  activeDropdownId === item.id.toString() ? "w-full" : "w-0",
                )}
              ></div>
              <HoverDropdownMenu menuItem={item} />
            </motion.li>
          ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
