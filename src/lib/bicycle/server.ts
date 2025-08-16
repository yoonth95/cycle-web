import "server-only";

import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import { normalizeBicycleSectionsFromDB } from "@/lib/bicycle/transform";
import type {
  BicycleLayoutData,
  BicyclePageContentData,
  BicycleDbPageRow,
  BicycleDbPageLayoutRow,
  BicycleDbPageSectionRow,
  BicycleNormalizationInput,
} from "@/types/bicycle";

async function fetchBicycleLayoutFromDB(slug: string): Promise<BicycleLayoutData | null> {
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id, slug")
    .eq("slug", slug)
    .maybeSingle<BicycleDbPageRow>();
  if (pageErr || !page) {
    console.error("[pages] fetch error", pageErr);
    return null;
  }

  const { data, error } = await supabase
    .from("page_layouts")
    .select("id, page_id, layout")
    .eq("page_id", page.id)
    .maybeSingle<BicycleDbPageLayoutRow>();

  if (error) {
    console.error("[bicycle_layout] fetch error", error);
    return null;
  }
  if (!data || !data.layout || typeof data.layout !== "object") return null;

  // 신뢰 가능한 형태로 저장된다고 가정. 런타임 파싱은 렌더 단계에서 수행.
  return data.layout as BicycleLayoutData;
}

async function fetchBicycleSectionsFromDB(slug: string): Promise<BicyclePageContentData | null> {
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id, slug")
    .eq("slug", slug)
    .maybeSingle<BicycleDbPageRow>();
  if (pageErr || !page) {
    console.error("[pages] fetch error", pageErr);
    return null;
  }

  const { data, error } = await supabase
    .from("page_sections")
    .select("id, page_id, section_type, data, order_index")
    .eq("page_id", page.id);

  if (error) {
    console.error("[bicycle_sections] fetch error", error);
    return null;
  }
  if (!data) return null;

  // 정렬 우선: 섹션 고유 order_index가 있으면 우선 적용
  const rows = (data as BicycleDbPageSectionRow[]).slice().sort((a, b) => {
    const ao = a.order_index ?? 0;
    const bo = b.order_index ?? 0;
    return ao - bo;
  });

  // transform expects { section: string } field; map section_type -> section
  const normalizedInput: BicycleNormalizationInput[] = rows.map((r) => ({
    id: r.id,
    slug: page.slug,
    section: r.section_type,
    data: r.data,
    order_index: r.order_index,
  }));
  return normalizeBicycleSectionsFromDB(normalizedInput);
}

// =============================================================================
// bicycles 페이지 (메인 자전거 페이지)
// =============================================================================
export const getBicycleLayout = unstable_cache(
  () => fetchBicycleLayoutFromDB("bicycles"),
  ["bicycle-layout"],
  {
    revalidate: 60, // 1분 (60초)
    tags: ["bicycle-layout"],
  },
);

export const getBicycleContent = unstable_cache(
  () => fetchBicycleSectionsFromDB("bicycles"),
  ["bicycle-content"],
  {
    revalidate: 60, // 1분 (60초)
    tags: ["bicycle-content"],
  },
);

// =============================================================================
// bicycles/style 페이지 (스타일별 자전거 페이지)
// =============================================================================
export const getBicycleStyleLayout = unstable_cache(
  () => fetchBicycleLayoutFromDB("bicycles-style"),
  ["bicycle-style-layout"],
  {
    revalidate: 60, // 1분 (60초)
    tags: ["bicycle-style-layout"],
  },
);

export const getBicycleStyleContent = unstable_cache(
  () => fetchBicycleSectionsFromDB("bicycles-style"),
  ["bicycle-style-content"],
  {
    revalidate: 60, // 1분 (60초)
    tags: ["bicycle-style-content"],
  },
);
