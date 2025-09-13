import type { ContactFormData, ContactSubmissionResult } from "@/types/contact";

/**
 * Contact 폼 제출
 */
export async function submitContactForm(
  formData: ContactFormData,
): Promise<ContactSubmissionResult> {
  try {
    const response = await fetch("/api/contact", {
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
