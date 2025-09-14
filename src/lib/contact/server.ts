import "server-only";

import { fetchPageLayout } from "@/lib/common/page-server";
import { transformContactsLayout } from "@/lib/contact/transform";
import type { ContactsLayout, ContactsLayoutData } from "@/types/contact";

// =============================================================================
// Contact 레이아웃 조회
// =============================================================================

/**
 * Contacts 페이지 레이아웃 조회
 */
export async function getContactsLayout(slug: string): Promise<{
  layout: ContactsLayoutData;
} | null> {
  try {
    const data = await fetchPageLayout<ContactsLayout>(slug, {
      isPreview: false,
      revalidateTime: 3600,
    });

    if (!data?.layout) return null;

    const transformedLayout = transformContactsLayout(data.layout);

    if (!transformedLayout) {
      console.error("[getContactsLayout] Transform 실패");
      return null;
    }

    return {
      layout: transformedLayout,
    };
  } catch (error) {
    console.error("[getContactsLayout] Error:", error);
    return null;
  }
}
