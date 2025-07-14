"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sortSubItems } from "@/utils/navigation-utils";
import { FullMenuProps } from "@/types/navigation-props";

const FullMobileMenu = ({ sortedMenuData, isMenuOpen }: FullMenuProps) => {
  const defaultAccordionValue = sortedMenuData[0].id.toString();

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
          <div className="container mx-auto px-4 py-4">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={defaultAccordionValue}
            >
              {sortedMenuData.map((mainCategory) =>
                mainCategory.type === "group" ? (
                  <AccordionItem
                    key={mainCategory.id}
                    value={mainCategory.id.toString()}
                    className="border-b border-gray-100 cursor-pointer"
                  >
                    <AccordionTrigger className="text-lg font-bold py-4 text-figma-alizarin-crimson hover:no-underline cursor-pointer">
                      <h3 className="flex-1 text-left">{mainCategory.slug}</h3>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      {sortSubItems(mainCategory.items).map((item) => (
                        <Link
                          key={item.id}
                          href={item.link}
                          className="text-gray-600 hover:text-figma-alizarin-crimson transition-colors duration-200 block my-3 text-sm border-l-2 border-transparent hover:border-figma-alizarin-crimson pl-3"
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
                    className="text-lg font-bold py-4 text-figma-alizarin-crimson hover:text-figma-alizarin-crimson transition-colors duration-200 block border-b border-gray-100"
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
