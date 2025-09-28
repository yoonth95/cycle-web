import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { PopupItemSchema } from "@/types/popup";

const CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
  "CDN-Cache-Control": "public, s-maxage=300",
};

export async function GET() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn("[popup] Supabase client unavailable; returning empty popup list");
    const response = NextResponse.json({ popups: [] });
    Object.entries(CACHE_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  try {
    const { data, error } = await supabase
      .from("popups")
      .select("id, image, link")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[popup] failed to fetch popups", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const parsed = PopupItemSchema.array().safeParse(data ?? []);
    if (!parsed.success) {
      console.error("[popup] failed to parse popup data", parsed.error);
      return NextResponse.json({ error: "Invalid popup data" }, { status: 500 });
    }

    const response = NextResponse.json({ popups: parsed.data });
    Object.entries(CACHE_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("[popup] unexpected error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
