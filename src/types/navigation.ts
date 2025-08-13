/**
 * Navigation 타입 정의
 */

import { z } from "zod";

// =============================================================================
// DB 스키마
// =============================================================================

export const NavigationMenuSchema = z.object({
  id: z.string(),
  slug: z.string(),
  link: z.string().nullable(),
  type: z.enum(["group", "single"]),
  order_index: z.number(),
});

export const NavigationMenuItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  menu_id: z.string(),
  parent_id: z.string().nullable(),
  link: z.string().nullable(),
  type: z.enum(["group", "single"]),
  order_index: z.number(),
});

// =============================================================================
// 타입 정의
// =============================================================================

export interface NavigationSubItem {
  id: string;
  slug: string;
  link: string;
  order_index: number;
  type?: "group" | "single";
  items?: NavigationSubItem[];
}

export interface NavigationCategoryItem {
  id: string;
  slug: string;
  link?: string;
  order_index: number;
  type?: "group" | "single";
  items?: NavigationSubItem[];
}

export type NavigationItem =
  | {
      id: string;
      slug: string;
      link: string;
      type: "group";
      order_index: number;
      items: NavigationCategoryItem[];
    }
  | {
      id: string;
      slug: string;
      link: string;
      type: "single";
      order_index: number;
    };

export type NavigationDataType = NavigationItem[];

// DB 타입들
export type NavigationMenu = z.infer<typeof NavigationMenuSchema>;
export type NavigationMenuItem = z.infer<typeof NavigationMenuItemSchema>;

// Props 타입들
export interface NavigationProps {
  menuData: NavigationDataType;
}

export interface FullMenuProps {
  sortedMenuData: NavigationDataType;
  isMenuOpen: boolean;
}

export interface HamburgerButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}
