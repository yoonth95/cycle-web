import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/utils/fetchCacheOption";
import { NoticeListResponseType } from "@/types/notice";

export async function GET(request: NextRequest): Promise<NextResponse<NoticeListResponseType>> {
  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // 파라미터 검증
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json(
        {
          notices: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: 1,
          pageSize: 10,
          hasMore: false,
        },
        { status: 400 },
      );
    }

    const { baseUrl, headers } = getSupabaseConfig();

    const offset = (page - 1) * pageSize;

    // notices 데이터 조회
    const dataResponse = await fetch(
      `${baseUrl}/rest/v1/notices?select=id,title,is_published,view_count,is_pinned,created_at,updated_at&is_published=eq.true&order=${sortBy}.${sortOrder}&limit=${pageSize}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          ...headers,
          Prefer: "count=exact",
        },
      },
    );

    if (!dataResponse.ok) {
      const errorText = await dataResponse.text();
      console.error("[Notices API] Supabase 조회 실패:", errorText);

      return NextResponse.json(
        {
          notices: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: page,
          pageSize,
          hasMore: false,
        },
        { status: 500 },
      );
    }

    const notices = await dataResponse.json();

    const totalCount = parseInt(dataResponse.headers.get("content-range")?.split("/")[1] || "0");
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasMore = page < totalPages;

    return NextResponse.json({
      notices,
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
      hasMore,
    });
  } catch (error) {
    console.error("[Notices API] 처리 중 오류:", error);

    return NextResponse.json(
      {
        notices: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
        hasMore: false,
      },
      { status: 500 },
    );
  }
}

// POST, PUT, DELETE 메서드는 지원하지 않음
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
