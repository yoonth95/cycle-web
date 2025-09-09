import { createCacheOptions, getSupabaseConfig } from "@/utils/fetchCacheOption";
import type {
  NoticeListResponseType,
  NoticeListParamsType,
  NoticeListItemType,
} from "@/types/notice";
import { PageCacheOptions } from "@/types/common";

/**
 * 공지사항 목록을 가져옵니다.
 */
export async function getNoticeList(
  params: NoticeListParamsType = {
    page: 1,
    pageSize: 5,
    sortBy: "created_at",
    sortOrder: "desc",
  },
  options: PageCacheOptions = { isPreview: false, revalidateTime: 3600 }, // 1시간 캐시
): Promise<NoticeListResponseType | null> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions("notices-list", options);

  try {
    const { page, pageSize, sortBy, sortOrder } = params;
    const offset = (page - 1) * pageSize;

    const query = new URLSearchParams({
      select: "id,title,created_at,updated_at,view_count",
      is_published: "eq.true",
      order: `${sortBy}.${sortOrder}`,
      limit: pageSize.toString(),
      offset: offset.toString(),
    });

    const response = await fetch(`${baseUrl}/rest/v1/notices?${query.toString()}`, {
      ...cacheOption,
      headers: { ...headers, Prefer: "count=exact" },
    });

    if (!response.ok) {
      throw new Error(`Notice list fetch failed: ${response.status}`);
    }

    const totalCountHeader = response.headers.get("content-range");
    const totalCount = totalCountHeader ? parseInt(totalCountHeader.split("/")[1], 10) : 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const notices = (await response.json()) as NoticeListItemType[];

    return {
      notices,
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
    };
  } catch (error) {
    console.error("[getNoticeList] Error:", error);
    return null;
  }
}
