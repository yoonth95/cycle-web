import type { NoticeDetailType, NoticesLayoutData } from "@/types/notice";
import { fetchPageLayout } from "@/lib/common/page-server";
import { transformNoticesLayout, transformNoticeDetail } from "@/lib/notice/transform";
import { getSupabaseConfig, createCacheOptions } from "@/utils/fetchCacheOption";
import { PageCacheOptions } from "@/types/common";

// =============================================================================
// 공지사항 레이아웃 조회
// =============================================================================
export async function getNoticesLayout(): Promise<{
  layout: NoticesLayoutData;
} | null> {
  try {
    const data = await fetchPageLayout("notices", {
      isPreview: false,
      revalidateTime: 3600,
    });

    if (!data?.layout) return null;

    // transform을 통해 zod 검증과 deltaToHtml 변환 적용
    const transformedLayout = transformNoticesLayout(data.layout);

    if (!transformedLayout) {
      console.error("[getNoticesLayout] Transform 실패");
      return null;
    }

    return {
      layout: transformedLayout,
    };
  } catch (error) {
    console.error("[getNoticesLayout] Error:", error);
    return null;
  }
}

// =============================================================================
// 공지사항 상세 조회
// =============================================================================
export async function getNoticeDetail(
  id: string,
  options: PageCacheOptions = { isPreview: false, revalidateTime: 3600 },
): Promise<NoticeDetailType | null> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions("notice-detail", options);

  try {
    const response = await fetch(
      `${baseUrl}/rest/v1/notices?select=*&id=eq.${id}&is_published=eq.true`,
      { ...cacheOption, headers },
    );

    if (!response.ok) {
      throw new Error(`Notice detail fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as NoticeDetailType[];
    const rawNotice = data[0];

    // 데이터가 없는 경우
    if (!rawNotice) {
      return null;
    }

    // Zod 검증과 변환 적용
    return transformNoticeDetail(rawNotice);
  } catch (error) {
    console.error("[getNoticeDetail] Error:", error);
    return null;
  }
}

// =============================================================================
// 공지사항 조회수 증가
// =============================================================================
export async function incrementNoticeViewCount(id: string): Promise<boolean> {
  const { baseUrl, headers } = getSupabaseConfig();

  try {
    const response = await fetch(`${baseUrl}/rest/v1/rpc/increment_notice_view_count`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ notice_id: id }),
    });

    if (!response.ok) {
      throw new Error(`Increment view count failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("[incrementNoticeViewCount] Error:", error);
    return false;
  }
}
