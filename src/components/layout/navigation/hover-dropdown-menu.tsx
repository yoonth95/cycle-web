"use client";

import { motion, AnimatePresence } from "framer-motion";
import { sortSubItems } from "@/utils/navigation-utils";
import { HoverDropdownMenuProps } from "@/types/navigation-props";

const HoverDropdownMenu = ({
  activeCategory,
  activeMenuItem,
  isMenuOpen,
}: HoverDropdownMenuProps) => {
  return (
    <AnimatePresence>
      {activeCategory && !isMenuOpen && activeMenuItem && activeMenuItem.type === "group" && (
        <motion.div
          className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg lg:block z-40"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-bold text-figma-alizarin-crimson mb-4 text-lg">
                  {activeMenuItem.slug}
                </h3>
                <ul className="space-y-2">
                  {sortSubItems(activeMenuItem.items).map((subItem) => (
                    <li key={subItem.id}>
                      <a
                        href={subItem.link}
                        className="text-gray-600 hover:text-figma-alizarin-crimson transition-colors duration-200 block py-1"
                      >
                        {subItem.slug}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoverDropdownMenu;
