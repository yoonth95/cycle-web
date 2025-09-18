import {
  type ContactsFormData,
  type ContactsSubmissionResult,
  type ContactsListParamsType,
  type ContactsListResponseType,
  ContactsListResponseSchema,
} from "@/types/contact";

/**
 * Contact 리스트 조회
 */
export async function getContactListFromAPI(
  params: ContactsListParamsType = {
    page: 1,
    pageSize: 8,
    sortBy: "created_at",
    sortOrder: "desc",
  },
): Promise<ContactsListResponseType | null> {
  try {
    const { page, pageSize, sortBy, sortOrder } = params;

    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      sortBy,
      sortOrder,
    });

    const response = await fetch(`/api/contacts?${query.toString()}`, {
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

    return ContactsListResponseSchema.parse(data);
  } catch (error) {
    console.error("[getContactListFromAPI] Error:", error);
    return null;
  }
}

/**
 * Contact 폼 제출
 */
export async function submitContactsForm(
  formData: ContactsFormData,
): Promise<ContactsSubmissionResult> {
  try {
    const response = await fetch("/api/contacts-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("[submitContactForm] Error:", error);
    return {
      success: false,
      message: "문의사항 접수 중 오류가 발생했습니다. 다시 시도해 주세요.",
    };
  }
}
