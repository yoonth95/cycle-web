import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categoryId = searchParams.get("categoryId");
  const tab = searchParams.get("tab") ?? "all"; // "all" | subcategory_id
  const limit = Number(searchParams.get("limit") ?? 10);

  // cursor (keyset) – order_index ASC, id ASC
  const cursorOrder = searchParams.get("cursorOrder"); // number | null (string)
  const cursorId = searchParams.get("cursorId"); // string | null

  if (!categoryId) {
    return NextResponse.json({ error: "categoryId is required" }, { status: 400 });
  }

  // 기본 쿼리
  let query = supabase
    .from("bicycles")
    .select("*")
    .eq("category_id", categoryId)
    .order("order_index", { ascending: true })
    .order("id", { ascending: true });

  // 탭 필터링
  if (tab !== "all") {
    query = query.eq("subcategories", tab);
  }

  // 커서 조건 (Keyset Pagination)
  if (cursorOrder && cursorId) {
    // (order_index > cursorOrder) OR (order_index = cursorOrder AND id > cursorId)
    query = query.or(
      `and(order_index.gt.${cursorOrder}),and(order_index.eq.${cursorOrder},id.gt.${cursorId})`,
    );
  }

  query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = data ?? [];
  const last = items[items.length - 1];

  const nextCursor =
    items.length === limit && last
      ? { order: last.order_index as number, id: last.id as string }
      : null;

  return NextResponse.json({
    items,
    nextCursor, // { order, id } | null
  });
}
