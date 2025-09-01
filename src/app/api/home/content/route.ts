export const revalidate = 300; // 5분 ISR

import { getHomeContentForAPI } from "@/lib/home/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");
    const slug = searchParams.get("slug");

    if (!pageId || !slug) {
      return Response.json({ error: "pageId is required" }, { status: 400 });
    }

    const contentData = await getHomeContentForAPI(pageId, slug);

    if (!contentData) {
      return Response.json({ error: "Content not found" }, { status: 404 });
    }

    return Response.json(contentData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "CDN-Cache-Control": "public, s-maxage=300",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("[API] Home content fetch error:", error);
    return Response.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
