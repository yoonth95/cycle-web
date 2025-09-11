import { NextRequest, NextResponse } from "next/server";
import { getBlogList } from "@/lib/blog";

type BlogsResponse<T> = {
  items: T[];
  nextCursor: null | { page: number };
  meta?: {
    count: number;
    hasMore: boolean;
    timestamp: string;
  };
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
    const sortBy = searchParams.get("sortBy") || "published_at";
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    // 현재 페이지 데이터 조회
    const blogList = await getBlogList({
      isPreview: false,
      revalidateTime: 300,
      page,
      pageSize,
      sortBy,
      sortOrder,
    });

    // 다음 페이지가 있는지 확인하기 위해 +1 페이지 데이터 조회
    const nextPageData = await getBlogList({
      isPreview: false,
      revalidateTime: 300,
      page: page + 1,
      pageSize,
      sortBy,
      sortOrder,
    });

    const hasMore = nextPageData.length > 0;
    const nextCursor = hasMore ? { page: page + 1 } : null;

    const response: BlogsResponse<(typeof blogList)[0]> = {
      items: blogList,
      nextCursor,
      meta: {
        count: blogList.length,
        hasMore,
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("[API] blogs error:", error);
    return NextResponse.json(
      { error: "블로그 리스트를 불러오는데 실패했습니다." },
      { status: 500 },
    );
  }
}
