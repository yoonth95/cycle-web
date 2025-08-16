import "server-only";
import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase/client";
import {
  NavigationDataType,
  NavigationSubItem,
  NavigationMenu,
  NavigationMenuItem,
} from "@/types/navigation";

// 데이터베이스에서 네비게이션 데이터를 직접 가져오는 함수
async function getNavigationDataFromDB(): Promise<NavigationDataType> {
  const { data: menus, error: menuErr } = await supabase
    .from("menus")
    .select("id, slug, link, type, order_index")
    .order("order_index", { ascending: true, nullsFirst: false });

  if (menuErr) {
    console.error(menuErr);
    return [];
  }
  if (!menus || menus.length === 0) return [];

  const menuIds = menus.map((m) => m.id);

  const { data: items, error: itemErr } = await supabase
    .from("menu_items")
    .select("id, menu_id, parent_id, slug, link, type, order_index")
    .in("menu_id", menuIds);

  if (itemErr) {
    console.error(itemErr);
    return menus
      .filter((m) => m.type === "single")
      .map((m) => ({
        id: m.id,
        slug: m.slug,
        link: m.link ?? "#",
        type: "single" as const,
        order_index: m.order_index ?? 1,
      }));
  }

  const byMenu = new Map<string, NavigationMenuItem[]>();
  const byParent = new Map<string, NavigationMenuItem[]>();
  for (const it of items ?? []) {
    if (!byMenu.has(it.menu_id)) byMenu.set(it.menu_id, []);
    byMenu.get(it.menu_id)!.push(it);
    if (it.parent_id) {
      if (!byParent.has(it.parent_id)) byParent.set(it.parent_id, []);
      byParent.get(it.parent_id)!.push(it);
    }
  }

  const sortByOrder = <T extends { order_index: number | null }>(a: T, b: T) =>
    (a.order_index ?? 1) - (b.order_index ?? 1);

  const buildChildren = (parentId: string): NavigationSubItem[] => {
    const children = (byParent.get(parentId) ?? []).slice().sort(sortByOrder);
    return children.map(
      (child): NavigationSubItem => ({
        id: child.id,
        slug: child.slug,
        link: child.link ?? "",
        order_index: child.order_index,
        type: child.type,
        items: buildChildren(child.id),
      }),
    );
  };

  const nav: NavigationDataType = (menus as NavigationMenu[])
    .slice()
    .sort(sortByOrder)
    .map((m) => {
      if (m.type === "single") {
        return {
          id: m.id,
          slug: m.slug,
          link: m.link ?? "#",
          type: "single" as const,
          order_index: m.order_index ?? 1,
        };
      }

      const level2 = (byMenu.get(m.id) ?? [])
        .filter((it) => it.parent_id === null)
        .slice()
        .sort(sortByOrder)
        .map((it) => ({
          id: it.id,
          slug: it.slug,
          link: it.link ?? "",
          order_index: it.order_index,
          type: it.type,
          items: buildChildren(it.id),
        }));

      return {
        id: m.id,
        slug: m.slug,
        link: m.link ?? "#",
        type: "group" as const,
        order_index: m.order_index ?? 1,
        items: level2,
      };
    });

  return nav;
}

/**
 * 캐시된 네비게이션 데이터 가져오기 함수
 * 5분간 캐시되며 'navigation' 태그로 관리
 */
export const getNavigationData = unstable_cache(getNavigationDataFromDB, ["navigation-data"], {
  revalidate: 300, // 1분 (60초)
  tags: ["navigation"],
});
