"use client";

import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { useNavigationStore } from "@/stores/navigation-store";
import { sortSubItems, isCurrentPage } from "@/utils/navigation-utils";
import { cn } from "@/lib/utils";
import { NavigationItem, NavigationCategoryItem } from "@/types/navigation";

interface HoverDropdownMenuProps {
  menuItem: NavigationItem;
}

const HoverDropdownMenu = ({ menuItem }: HoverDropdownMenuProps) => {
  const { activeDropdownId, currentPath } = useNavigationStore(
    useShallow((state) => ({
      activeDropdownId: state.activeDropdownId,
      currentPath: state.currentPath,
    })),
  );
  const isActive = activeDropdownId === menuItem.id.toString();

  return (
    <>
      {menuItem.type === "group" && (
        <div
          className={cn(
            "absolute top-full left-0 z-40 w-full bg-white text-gray-800 shadow-lg",
            "transition-all duration-300 ease-out",
            isActive
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none opacity-0",
            "cursor-default",
          )}
        >
          <div className="container mx-auto px-4 py-8">
            {/* 3단계 구조인지 2단계 구조인지 판단 */}
            {menuItem.items &&
            menuItem.items.length > 0 &&
            menuItem.items[0].items &&
            menuItem.items[0].items.length > 0 &&
            menuItem.items[0].items[0].items ? (
              // 3단계 구조 (자전거 메뉴)
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2">
                {sortSubItems(menuItem.items).map((categoryItem: NavigationCategoryItem) => (
                  <div key={categoryItem.id} className="space-y-4">
                    <h2 className="border-b border-gray-200 pb-2 text-xl font-bold">
                      <Link
                        href={categoryItem.link || "#"}
                        className={cn(
                          "transition-colors duration-200",
                          isCurrentPage(currentPath, categoryItem.link || "")
                            ? "text-figma-alizarin-crimson"
                            : "text-figma-alizarin-crimson hover:text-figma-alizarin-crimson/80",
                        )}
                      >
                        {categoryItem.slug}
                      </Link>
                    </h2>
                    <div className="flex flex-col gap-6">
                      {categoryItem.items &&
                        sortSubItems(categoryItem.items).map((subCategoryItem) => (
                          <div key={subCategoryItem.id} className="space-y-2">
                            <h3 className="text-base font-semibold text-gray-800">
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
                            </h3>
                            <ul className="ml-4 space-y-1">
                              {subCategoryItem.items &&
                                sortSubItems(subCategoryItem.items).map((item) => {
                                  // URL 생성 시 안전한 방식 사용
                                  const baseUrl = subCategoryItem.link || "";
                                  const tabParam = item.link || "";
                                  const href =
                                    baseUrl && tabParam ? `${baseUrl}?tab=${tabParam}` : "#";

                                  return (
                                    <li key={item.id}>
                                      <Link
                                        href={href}
                                        className={cn(
                                          "block border-l-2 py-1 pl-2 text-sm transition-colors duration-200",
                                          isCurrentPage(currentPath, href)
                                            ? "text-figma-alizarin-crimson border-figma-alizarin-crimson"
                                            : "hover:text-figma-alizarin-crimson hover:border-figma-alizarin-crimson border-transparent text-gray-600",
                                        )}
                                      >
                                        {item.slug}
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 2단계 구조 (자전거 용품, 우리가게소식)
              <div className="grid">
                <div className="space-y-4">
                  <h2 className="border-b border-gray-200 pb-2 text-xl font-bold">
                    <Link
                      href={menuItem.link}
                      className={cn(
                        "transition-colors duration-200",
                        isCurrentPage(currentPath, menuItem.link)
                          ? "text-figma-alizarin-crimson"
                          : "text-figma-alizarin-crimson hover:text-figma-alizarin-crimson/80",
                      )}
                    >
                      {menuItem.slug}
                    </Link>
                  </h2>
                  <div>
                    <ul className="space-y-2">
                      {menuItem.items &&
                        sortSubItems(menuItem.items).map((item: NavigationCategoryItem) => (
                          <li key={item.id}>
                            <Link
                              href={item.link || "#"}
                              className={cn(
                                "my-4 block border-l-2 pl-3 text-sm transition-colors duration-200",
                                isCurrentPage(currentPath, item.link || "")
                                  ? "text-figma-alizarin-crimson border-figma-alizarin-crimson"
                                  : "hover:text-figma-alizarin-crimson hover:border-figma-alizarin-crimson border-transparent text-gray-600",
                              )}
                            >
                              {item.slug}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HoverDropdownMenu;
