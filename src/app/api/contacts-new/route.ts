import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/utils/fetchCacheOption";
import { sendContactEmails } from "@/lib/email";
import { transformContactsFormData } from "@/lib/contact/transform";
import { invalidateContactsCache } from "@/lib/admin/inquiries-cache";
import type { ContactsSubmissionResult } from "@/types/contact";

export async function POST(request: NextRequest): Promise<NextResponse<ContactsSubmissionResult>> {
  try {
    // 요청 본문 파싱
    const body = await request.json();

    // 폼 데이터 검증 및 변환
    const validatedData = transformContactsFormData(body);

    if (!validatedData) {
      return NextResponse.json(
        {
          success: false,
          message: "입력 데이터가 올바르지 않습니다. 모든 필드를 올바르게 입력해 주세요.",
        },
        { status: 400 },
      );
    }

    // Supabase에 데이터 저장
    const { baseUrl, headers } = getSupabaseConfig();

    const hashPassword = validatedData.isPublic
      ? null
      : await bcrypt.hash(validatedData.password || "", 10);

    const response = await fetch(`${baseUrl}/rest/v1/contacts`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title: validatedData.title,
        description: validatedData.description,
        author: validatedData.author,
        email: validatedData.email,
        is_public: validatedData.isPublic,
        password: hashPassword,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Contact API] Supabase 저장 실패:", errorText);

      return NextResponse.json(
        {
          success: false,
          message: "문의사항 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        },
        { status: 500 },
      );
    }

    const savedContact = await response.json();
    const contactId = savedContact?.[0]?.id;

    try {
      await invalidateContactsCache(contactId);
    } catch (cacheError) {
      console.error("[Contact API] Cache invalidation failed:", cacheError);
    }

    // 이메일 전송 (백그라운드에서 실행하여 응답 속도 향상)
    sendContactEmails(validatedData)
      .then((emailResults) => {
        if (emailResults.adminSent) {
          console.log("[Contact API] 관리자 알림 메일 전송 완료");
        } else {
          console.warn("[Contact API] 관리자 알림 메일 전송 실패");
        }

        if (emailResults.userSent) {
          console.log("[Contact API] 사용자 확인 메일 전송 완료");
        } else {
          console.warn("[Contact API] 사용자 확인 메일 전송 실패");
        }
      })
      .catch((error) => {
        console.error("[Contact API] 메일 전송 중 오류:", error);
      });

    return NextResponse.json({
      success: true,
      message: "문의사항이 성공적으로 접수되었습니다. 빠른 시간 내에 답변드리겠습니다.",
      id: contactId,
    });
  } catch (error) {
    console.error("[Contact API] 처리 중 오류:", error);

    return NextResponse.json(
      {
        success: false,
        message: "문의사항 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      { status: 500 },
    );
  }
}

// GET 메서드는 지원하지 않음
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
