import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { replyToInquiry } from "@/lib/admin/inquiries";
import { getAdminSession } from "@/lib/admin/session";

const schema = z.object({
  content: z.string().min(1, "답변 내용을 입력해주세요."),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { inquiryId: string } },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const result = schema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    await replyToInquiry(params.inquiryId, result.data.content);

    return NextResponse.json({ message: "답변이 등록되었습니다." });
  } catch (error) {
    console.error("[api/admin/inquiries/:id/reply][POST]", error);
    return NextResponse.json({ message: "답변 저장에 실패했습니다." }, { status: 500 });
  }
}
