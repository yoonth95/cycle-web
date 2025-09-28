import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

// 응답 캐싱을 위한 헤더 설정
const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
  "CDN-Cache-Control": "public, s-maxage=300",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categoryId = searchParams.get("categoryId");
  const tab = searchParams.get("tab") ?? "all";
  const limit = Math.min(Number(searchParams.get("limit") ?? 10), 40); // 기본값 증가, 최대값 제한

  const cursorOrder = searchParams.get("cursorOrder");
  const cursorId = searchParams.get("cursorId");

  if (!categoryId) {
    return NextResponse.json({ error: "categoryId is required" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    // 1. 단순화된 쿼리 빌딩
    let query = supabase
      .from("bicycles")
      .select(
        `
        id,
        category_id,
        subcategory,
        name,
        description,
        images,
        features,
        tags,
        order_index,
        created_at
      `,
      ) // 필요한 필드만 선택
      .eq("category_id", categoryId);

    // 2. 탭 필터링 (인덱스 활용)
    if (tab !== "all") {
      query = query.eq("subcategory", tab);
    }

    // 3. 단순화된 커서 페이지네이션 (복합 인덱스 활용)
    if (cursorOrder && cursorId) {
      // 더 간단한 조건으로 변경
      query = query
        .gte("order_index", Number(cursorOrder))
        .neq("id", cursorId) // 중복 방지
        .order("order_index", { ascending: true })
        .order("id", { ascending: true });
    } else {
      query = query.order("order_index", { ascending: true }).order("id", { ascending: true });
    }

    // 4. 한 번에 더 많은 데이터를 가져와 네트워크 호출 줄이기
    query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const items = data ?? [];
    const last = items[items.length - 1];

    const nextCursor =
      items.length === limit && last
        ? { order: last.order_index as number, id: last.id as string }
        : null;

    const response = NextResponse.json({
      items,
      nextCursor,
      meta: {
        count: items.length,
        hasMore: nextCursor !== null,
        timestamp: new Date().toISOString(),
      },
    });

    // 캐시 헤더 설정
    Object.entries(CACHE_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("API Route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
