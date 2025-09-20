import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/utils/fetchCacheOption";
import { ContactDetailPasswordFormDataSchema, ContactsSubmissionResult } from "@/types/contact";

export async function POST(request: NextRequest): Promise<NextResponse<ContactsSubmissionResult>> {
  try {
    const body = await request.json();

    const validatedData = ContactDetailPasswordFormDataSchema.parse(body);
    if (!validatedData) {
      return NextResponse.json(
        {
          success: false,
          message: "입력 데이터가 올바르지 않습니다. 모든 필드를 올바르게 입력해 주세요.",
        },
        { status: 400 },
      );
    }

    const { baseUrl, headers } = getSupabaseConfig();

    const response = await fetch(`${baseUrl}/rest/v1/contacts?select=password&id=eq.${body.id}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Password fetch failed: ${response.status}`);
    }

    const result = await response.json();
    const storedPassword = result[0]?.password;
    const isMatch = await bcrypt.compare(validatedData.password, storedPassword);

    if (isMatch) {
      return NextResponse.json({ success: true, message: "비밀번호가 일치합니다." });
    } else {
      return NextResponse.json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error("[Contacts Detail Password] Error:", error);
    return NextResponse.json(
      { success: false, message: "비밀번호 확인 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
