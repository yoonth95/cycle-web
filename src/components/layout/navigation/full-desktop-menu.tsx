"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { sortSubItems } from "@/utils/navigation-utils";
import { FullMenuProps } from "@/types/navigation-props";
import { NavigationCategoryItem } from "@/types/navigation-data";

const FullDesktopMenu = ({ sortedMenuData, isMenuOpen }: FullMenuProps) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed top-16 left-0 z-40 h-[calc(100vh-64px)] w-full overflow-y-auto bg-white text-gray-800 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
              {sortedMenuData &&
                sortedMenuData.map((mainCategory, mainIdx) => (
                  <motion.div
                    key={mainCategory.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: mainIdx * 0.1 }}
                    className="space-y-3"
                  >
                    <motion.h1
                      className="border-b border-gray-200 pb-1 text-lg font-bold"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Link
                        href={mainCategory.link}
                        className="text-figma-alizarin-crimson hover:text-figma-alizarin-crimson/80 transition-colors duration-200"
                      >
                        {mainCategory.slug}
                      </Link>
                    </motion.h1>
                    {mainCategory.type === "single" ? (
                      // 단일 메뉴 (오시는길, 문의사항)
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: mainIdx * 0.1 }}
                        className="mt-2"
                      >
                        <motion.div whileHover={{ x: 2 }}>
                          <Link
                            href={mainCategory.link}
                            className="hover:text-figma-alizarin-crimson hover:border-figma-alizarin-crimson block border-l-2 border-transparent py-0.5 pl-2 text-sm text-gray-600 transition-colors duration-200"
                          >
                            바로가기 →
                          </Link>
                        </motion.div>
                      </motion.div>
                    ) : (
                      mainCategory.type === "group" &&
                      mainCategory.items && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: mainIdx * 0.1 }}
                          className="flex flex-col gap-6"
                        >
                          {/* 3단계 구조인지 2단계 구조인지 판단 */}
                          {mainCategory.items &&
                          mainCategory.items.length > 0 &&
                          mainCategory.items[0].items &&
                          mainCategory.items[0].items.length > 0 &&
                          mainCategory.items[0].items[0].items ? (
                            // 3단계 구조 (자전거 메뉴)
                            sortSubItems(mainCategory.items).map(
                              (categoryItem: NavigationCategoryItem, catIdx) => (
                                <motion.div
                                  key={categoryItem.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: mainIdx * 0.1 + catIdx * 0.05,
                                  }}
                                  className="flex flex-col gap-3"
                                >
                                  <motion.h2
                                    className="text-figma-alizarin-crimson text-base font-semibold"
                                    whileHover={{ x: 2 }}
                                  >
                                    <Link
                                      href={categoryItem.link || "#"}
                                      className="hover:text-figma-alizarin-crimson/80 transition-colors duration-200"
                                    >
                                      {categoryItem.slug}
                                    </Link>
                                  </motion.h2>
                                  <div className="ml-3 flex flex-col gap-3">
                                    {categoryItem.items &&
                                      sortSubItems(categoryItem.items).map(
                                        (subCategoryItem, subIdx) => (
                                          <motion.div
                                            key={subCategoryItem.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              duration: 0.2,
                                              delay: mainIdx * 0.1 + catIdx * 0.05 + subIdx * 0.02,
                                            }}
                                            className="flex flex-col gap-1"
                                          >
                                            <motion.h3
                                              className="text-sm font-medium text-gray-800"
                                              whileHover={{ x: 2 }}
                                            >
                                              <Link
                                                href={subCategoryItem.link}
                                                className="hover:text-figma-alizarin-crimson transition-colors duration-200"
                                              >
                                                {subCategoryItem.slug}
                                              </Link>
                                            </motion.h3>
                                            <ul className="ml-2 flex flex-col gap-0.5">
                                              {subCategoryItem.items &&
                                                sortSubItems(subCategoryItem.items).map(
                                                  (item, itemIdx) => (
                                                    <motion.li
                                                      key={item.id}
                                                      initial={{ opacity: 0, x: -10 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      transition={{
                                                        duration: 0.2,
                                                        delay:
                                                          mainIdx * 0.1 +
                                                          catIdx * 0.05 +
                                                          subIdx * 0.02 +
                                                          itemIdx * 0.01,
                                                      }}
                                                    >
                                                      <motion.div whileHover={{ x: 2 }}>
                                                        <Link
                                                          href={`${subCategoryItem.link}?tab=${item.link}`}
                                                          className="hover:text-figma-alizarin-crimson hover:border-figma-alizarin-crimson block border-l-2 border-transparent py-0.5 pl-2 text-sm text-gray-600 transition-colors duration-200"
                                                        >
                                                          {item.slug}
                                                        </Link>
                                                      </motion.div>
                                                    </motion.li>
                                                  ),
                                                )}
                                            </ul>
                                          </motion.div>
                                        ),
                                      )}
                                  </div>
                                </motion.div>
                              ),
                            )
                          ) : (
                            // 2단계 구조 (용품, 대리점, 고객지원, 뉴스, 회사소개)
                            <ul className="flex flex-col gap-1">
                              {sortSubItems(mainCategory.items).map(
                                (item: NavigationCategoryItem, itemIdx) => (
                                  <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.2,
                                      delay: mainIdx * 0.1 + itemIdx * 0.02,
                                    }}
                                  >
                                    <motion.div whileHover={{ x: 2 }}>
                                      <Link
                                        href={item.link || "#"}
                                        className="hover:text-figma-alizarin-crimson hover:border-figma-alizarin-crimson block border-l-2 border-transparent py-0.5 pl-2 text-sm text-gray-600 transition-colors duration-200"
                                      >
                                        {item.slug}
                                      </Link>
                                    </motion.div>
                                  </motion.li>
                                ),
                              )}
                            </ul>
                          )}
                        </motion.div>
                      )
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
