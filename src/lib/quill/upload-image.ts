"use client";

interface UploadResponse {
  url?: string;
  message?: string;
}

export async function uploadEditorImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/uploads/editor", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "이미지 업로드에 실패했습니다.";
    try {
      const errorBody = (await response.json()) as UploadResponse;
      if (errorBody?.message) {
        message = errorBody.message;
      }
    } catch (_error) {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  const result = (await response.json()) as UploadResponse;
  if (!result.url) {
    throw new Error("이미지 업로드 URL을 확인할 수 없습니다.");
  }

  return result.url;
}
