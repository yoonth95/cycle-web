"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sortSubItems, isCurrentPage, getDefaultAccordionValue } from "@/utils/navigation-utils";
import { useNavigationStore } from "@/stores/navigation-store";
import { FullMenuProps, NavigationCategoryItem } from "@/types/navigation";

const FullMobileMenu = ({ sortedMenuData, isMenuOpen }: FullMenuProps) => {
  const currentPath = useNavigationStore((state) => state.currentPath);
  const defaultAccordionValue = getDefaultAccordionValue(currentPath, sortedMenuData);

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
          <div className="container mx-auto px-4 py-4">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={defaultAccordionValue}
            >
              {sortedMenuData &&
                sortedMenuData.map((mainCategory) =>
                  mainCategory.type === "group" ? (
                    <AccordionItem
                      key={mainCategory.id}
                      value={mainCategory.id.toString()}
                      className="cursor-pointer border-b border-gray-100"
                    >
                      <AccordionTrigger className="text-figma-alizarin-crimson cursor-pointer py-4 text-lg font-bold hover:no-underline">
                        <h3 className="flex-1 text-left">{mainCategory.slug}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pb-4">
                        {/* 3단계 구조인지 2단계 구조인지 판단 */}
                        {mainCategory.items &&
                        mainCategory.items.length > 0 &&
                        mainCategory.items[0].items &&
                        mainCategory.items[0].items.length > 0 &&
                        mainCategory.items[0].items[0].items
                          ? // 3단계 구조 (자전거 메뉴)
                            sortSubItems(mainCategory.items).map(
                              (categoryItem: NavigationCategoryItem) => (
                                <div key={categoryItem.id} className="space-y-3">
                                  <h4 className="text-figma-alizarin-crimson font-semibold">
                                    <Link
                                      href={categoryItem.link || "#"}
                                      className={cn(
                                        "transition-colors duration-200",
                                        isCurrentPage(currentPath, categoryItem.link || "")
                                          ? "text-figma-alizarin-crimson"
                                          : "hover:text-figma-alizarin-crimson/80",
                                      )}
                                    >
                                      {categoryItem.slug}
                                    </Link>
                                  </h4>
                                  <div className="space-y-2">
                                    {categoryItem.items &&
                                      sortSubItems(categoryItem.items).map((subCategoryItem) => (
                                        <div key={subCategoryItem.id} className="ml-3">
                                          <h5
                                            className={cn(
                                              "mb-2 font-medium",
                                              isCurrentPage(currentPath, subCategoryItem.link)
                                                ? "text-figma-alizarin-crimson"
                                                : "text-gray-700",
                                            )}
                                          >
                                            <Link
                                              href={subCategoryItem.link}
                                              className={cn(
                                                "transition-colors duration-200",
                                                isCurrentPage(currentPath, subCategoryItem.link)
                                                  ? "text-figma-alizarin-crimson"
                                                  : "hover:text-figma-alizarin-crimson",
                                              )}
                                            >
                                              {subCategoryItem.slug}
                                            </Link>
                                          </h5>
                                          <div className="ml-3 space-y-1">
                                            {subCategoryItem.items &&
                                              sortSubItems(subCategoryItem.items).map((item) => (
                                                <Link
                                                  key={item.id}
                                                  href={`${subCategoryItem.link}?tab=${item.link}`}
                                                  className={cn(
                                                    "block border-l-2 py-1 pl-2 text-sm transition-colors duration-200",
                                                    isCurrentPage(
                                                      currentPath,
                                                      `${subCategoryItem.link}?tab=${item.link}`,
                                                    )
                                                      ? "text-figma-alizarin-crimson border-figma-alizarin-crimson"
                                                      : "hover:text-figma-alizarin-crimson hover:border-figma-alizarin-crimson border-transparent text-gray-600",
                                                  )}
                                                >
                                                  {item.slug}
                                                </Link>
                                              ))}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              ),
                            )
                          : // 2단계 구조 (자전거 용품, 우리가게소식)
                            mainCategory.items &&
                            sortSubItems(mainCategory.items).map((item: NavigationCategoryItem) => (
                              <Link
                                key={item.id}
                                href={item.link || "#"}
                                className={cn(
                                  "my-3 block border-l-2 pl-3 text-sm transition-colors duration-200",
                                  isCurrentPage(currentPath, item.link || "")
                                    ? "text-figma-alizarin-crimson border-figma-alizarin-crimson"
                                    : "hover:text-figma-alizarin-crimson hover:border-figma-alizarin-crimson border-transparent text-gray-600",
                                )}
                              >
                                {item.slug}
                              </Link>
                            ))}
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Link
                      key={mainCategory.id}
                      href={mainCategory.link}
                      className={cn(
                        "block border-b border-gray-100 py-4 text-lg font-bold transition-colors duration-200",
                        isCurrentPage(currentPath, mainCategory.link)
                          ? "text-figma-alizarin-crimson"
                          : "text-figma-alizarin-crimson hover:text-figma-alizarin-crimson",
                      )}
                    >
                      {mainCategory.slug}
                    </Link>
                  ),
                )}
            </Accordion>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullMobileMenu;
