import "server-only";

import type { ContactLayout, ContactLayoutData } from "@/types/contact";
import { fetchPageLayout } from "@/lib/common/page-server";
import { transformContactLayout } from "@/lib/contact/transform";
import { PageCacheOptions } from "@/types/common";

// =============================================================================
// Contact 레이아웃 조회
// =============================================================================
export async function getContactLayout(): Promise<{
  layout: ContactLayoutData;
} | null> {
  try {
    const data = await fetchPageLayout<ContactLayout>("contact", {
      isPreview: false,
      revalidateTime: 3600,
    });

    if (!data?.layout) return null;

    // transform을 통해 zod 검증 적용
    const transformedLayout = transformContactLayout(data.layout);

    if (!transformedLayout) {
      console.error("[getContactLayout] Transform 실패");
      return null;
    }

    return {
      layout: transformedLayout,
    };
  } catch (error) {
    console.error("[getContactLayout] Error:", error);
    return null;
  }
}
