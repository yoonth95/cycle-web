import "server-only";
import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import type {
  HomeLayoutData,
  HomePageContentData,
  DbPageRow,
  DbPageLayoutRow,
  DbPageSectionRow,
  NormalizationInput,
} from "@/types/home";
import { normalizeHomeSectionsFromDB } from "@/lib/home/transform";

async function fetchHomeLayoutFromDB(): Promise<HomeLayoutData | null> {
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id, slug")
    .eq("slug", "home")
    .maybeSingle<DbPageRow>();
  if (pageErr || !page) {
    console.error("[pages] fetch error", pageErr);
    return null;
  }

  const { data, error } = await supabase
    .from("page_layouts")
    .select("id, page_id, layout")
    .eq("page_id", page.id)
    .maybeSingle<DbPageLayoutRow>();

  if (error) {
    console.error("[home_layout] fetch error", error);
    return null;
  }
  if (!data || !data.layout || typeof data.layout !== "object") return null;

  // 신뢰 가능한 형태로 저장된다고 가정. 런타임 파싱은 렌더 단계에서 수행.
  return data.layout as HomeLayoutData;
}

async function fetchHomeSectionsFromDB(): Promise<HomePageContentData | null> {
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id, slug")
    .eq("slug", "home")
    .maybeSingle<DbPageRow>();
  if (pageErr || !page) {
    console.error("[pages] fetch error", pageErr);
    return null;
  }

  const { data, error } = await supabase
    .from("page_sections")
    .select("id, page_id, section_type, data, order_index")
    .eq("page_id", page.id);

  if (error) {
    console.error("[home_sections] fetch error", error);
    return null;
  }
  if (!data) return null;

  // 정렬 우선: 섹션 고유 order_index가 있으면 우선 적용
  const rows = (data as DbPageSectionRow[]).slice().sort((a, b) => {
    const ao = a.order_index ?? 0;
    const bo = b.order_index ?? 0;
    return ao - bo;
  });

  // transform expects { section: string } field; map section_type -> section
  const normalizedInput: NormalizationInput[] = rows.map((r) => ({
    id: r.id,
    slug: page.slug,
    section: r.section_type,
    data: r.data,
    order_index: r.order_index,
  }));
  return normalizeHomeSectionsFromDB(normalizedInput);
}

export const getHomeLayout = unstable_cache(fetchHomeLayoutFromDB, ["home-layout"], {
  revalidate: 60, // 1분 (60초)
  tags: ["home-layout"],
});

export const getHomeContent = unstable_cache(fetchHomeSectionsFromDB, ["home-content"], {
  revalidate: 60, // 1분 (60초)
  tags: ["home-content"],
});
