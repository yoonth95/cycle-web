import { fetchPageLayout } from "@/lib/common/page-server";
import { transformContactsLayout } from "@/lib/contact/transform";
import { getSupabaseConfig, createCacheOptions } from "@/utils/fetchCacheOption";
import { PageCacheOptions } from "@/types/common";
import type {
  ContactsLayout,
  ContactsLayoutData,
  ContactWithComments,
  DbContactRow,
} from "@/types/contact";
import { transformContactDetail } from "@/lib/contact/transform";

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

// =============================================================================
// 문의사항 상세 조회
// =============================================================================
export async function getContactDetail(
  id: string,
  options: PageCacheOptions = { isPreview: false, revalidateTime: 3600 },
): Promise<ContactWithComments | null> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions("contact-detail", options);

  try {
    const response = await fetch(
      `${baseUrl}/rest/v1/contacts?select=*,contact_comments(*)&id=eq.${id}`,
      { ...cacheOption, headers },
    );

    if (!response.ok) {
      throw new Error(`Contact detail fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as DbContactRow[];
    const rawContact = data[0];

    if (!rawContact) {
      return null;
    }

    return transformContactDetail(rawContact);
  } catch (error) {
    console.error("[getContactDetail] Error:", error);
    return null;
  }
}

// =============================================================================
// 문의사항 비밀번호 확인
// =============================================================================
export async function verifyContactPassword(
  id: string,
  password: string,
): Promise<{ success: boolean; message?: string }> {
  const { baseUrl, headers } = getSupabaseConfig();

  try {
    const response = await fetch(`${baseUrl}/rest/v1/contacts?select=password&id=eq.${id}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Password fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as { password: string }[];
    const storedPassword = data[0]?.password;

    if (!storedPassword) {
      return { success: false, message: "문의글을 찾을 수 없습니다." };
    }

    // TODO: In a real application, passwords should be hashed using a library like bcrypt.
    // const isMatch = await bcrypt.compare(password, storedPassword);
    const isMatch = storedPassword === password;

    if (isMatch) {
      return { success: true };
    } else {
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }
  } catch (error) {
    console.error("[verifyContactPassword] Error:", error);
    return { success: false, message: "서버 오류가 발생했습니다." };
  }
}
