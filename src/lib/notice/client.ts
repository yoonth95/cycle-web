import {
  type NoticeListResponseType,
  type NoticeListParamsType,
  NoticeListResponseSchema,
} from "@/types/notice";

/**
 * 공지사항 목록을 가져옵니다.
 */
export async function getNoticeListFromAPI(
  params: NoticeListParamsType = {
    page: 1,
    pageSize: 8,
    sortBy: "created_at",
    sortOrder: "desc",
  },
): Promise<NoticeListResponseType | null> {
  try {
    const { page, pageSize, sortBy, sortOrder } = params;

    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      sortBy,
      sortOrder,
    });

    const response = await fetch(`/api/notices?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error Response:", errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return NoticeListResponseSchema.parse(data);
  } catch (error) {
    console.error("[getNoticeListFromAPI] Error:", error);
    return null;
  }
}
