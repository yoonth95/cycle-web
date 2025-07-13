"use client";

import { motion, AnimatePresence } from "framer-motion";
import { sortSubItems } from "@/utils/navigation-utils";
import { FullDesktopMenuProps } from "@/types/navigation-props";

const FullDesktopMenu = ({ sortedMenuData, isMenuOpen }: FullDesktopMenuProps) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed top-16 left-0 w-full bg-white text-gray-800 z-40 overflow-y-auto shadow-lg h-[calc(100vh-64px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {sortedMenuData.map((mainCategory, mainIdx) => (
                <motion.div
                  key={mainCategory.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: mainIdx * 0.1 }}
                  className="space-y-4"
                >
                  <motion.h2
                    className="text-xl font-bold border-b border-gray-200 pb-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <a
                      href={mainCategory.link}
                      className="text-figma-alizarin-crimson hover:text-figma-alizarin-crimson/80 transition-colors duration-200"
                    >
                      {mainCategory.slug}
                    </a>
                  </motion.h2>
                  {mainCategory.type === "group" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: mainIdx * 0.1 }}
                    >
                      <ul className="space-y-2">
                        {sortSubItems(mainCategory.items).map((item, itemIdx) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: mainIdx * 0.1 + itemIdx * 0.02,
                            }}
                          >
                            <motion.a
                              href={item.link}
                              className="text-gray-600 hover:text-figma-alizarin-crimson transition-colors duration-200 block my-4 text-sm border-l-2 border-transparent hover:border-figma-alizarin-crimson pl-3"
                              whileHover={{ x: 2 }}
                            >
                              {item.slug}
                            </motion.a>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullDesktopMenu;
