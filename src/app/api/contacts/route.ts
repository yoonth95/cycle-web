import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/utils/fetchCacheOption";
import type { ContactsListResponseType } from "@/types/contact";

export async function GET(request: NextRequest): Promise<NextResponse<ContactsListResponseType>> {
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
          contacts: [],
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

    // 전체 카운트 조회
    const countResponse = await fetch(`${baseUrl}/rest/v1/contacts?select=count`, {
      method: "HEAD",
      headers: {
        ...headers,
        Prefer: "count=exact",
      },
    });

    const totalCount = parseInt(countResponse.headers.get("content-range")?.split("/")[1] || "0");
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;

    // contacts 데이터 조회 (공개 문의만)
    const dataResponse = await fetch(
      `${baseUrl}/rest/v1/contacts?select=id,title,name,is_public,created_at&is_public=eq.true&order=${sortBy}.${sortOrder}&limit=${pageSize}&offset=${offset}`,
      {
        method: "GET",
        headers,
      },
    );

    if (!dataResponse.ok) {
      const errorText = await dataResponse.text();
      console.error("[Contacts API] Supabase 조회 실패:", errorText);

      return NextResponse.json(
        {
          contacts: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: page,
          pageSize,
          hasMore: false,
        },
        { status: 500 },
      );
    }

    const contacts = await dataResponse.json();
    const hasMore = page < totalPages;

    return NextResponse.json({
      contacts,
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
      hasMore,
    });
  } catch (error) {
    console.error("[Contacts API] 처리 중 오류:", error);

    return NextResponse.json(
      {
        contacts: [],
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
