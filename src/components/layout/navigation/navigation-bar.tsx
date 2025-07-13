"use client";

import { motion } from "framer-motion";
import { sortMenuData } from "@/utils/navigation-utils";
import { DesktopNavigationProps } from "@/types/navigation-props";

const NavigationBar = ({
  menuData,
  activeCategory,
  onCategoryHover,
  onNavMouseEnter,
  onNavMouseLeave,
}: DesktopNavigationProps) => {
  const sortedMenuData = sortMenuData(menuData);

  return (
    <div onMouseEnter={onNavMouseEnter} onMouseLeave={onNavMouseLeave}>
      <nav className="hidden lg:flex items-center">
        {sortedMenuData.map((item) => (
          <motion.a
            key={item.id}
            href={item.link}
            className={`duration-200 font-medium px-4 py-5 relative after:absolute after:left-2 after:bottom-3 after:h-[2px] after:w-0 hover:after:w-[calc(100%-1rem)] after:bg-white after:transition-all after:duration-300 ${
              activeCategory === item.slug ? "after:w-[calc(100%-1rem)]" : ""
            }`}
            onMouseEnter={() => {
              if (item.type === "group") {
                onCategoryHover(item.slug);
              } else {
                onCategoryHover(null);
              }
            }}
            onClick={item.type === "single" ? undefined : (e) => e.preventDefault()}
          >
            {item.slug}
          </motion.a>
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;
