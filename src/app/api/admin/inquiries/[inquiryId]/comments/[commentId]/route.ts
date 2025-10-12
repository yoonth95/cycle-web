import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { deleteInquiryComment, updateInquiryComment } from "@/lib/admin/inquiries";
import { getAdminSession } from "@/lib/admin/session";

const schema = z.object({
  content: z.string().min(1, "답변 내용을 입력해주세요."),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ inquiryId: string; commentId: string }> },
) {
  const { inquiryId, commentId } = await params;

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

    await updateInquiryComment(inquiryId, commentId, result.data.content);

    return NextResponse.json({ message: "답변이 수정되었습니다." });
  } catch (error) {
    console.error(
      `[api/admin/inquiries/${inquiryId}/comments/${commentId}][PATCH]`,
      error,
    );
    return NextResponse.json({ message: "답변 수정에 실패했습니다." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ inquiryId: string; commentId: string }> },
) {
  const { inquiryId, commentId } = await params;

  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteInquiryComment(inquiryId, commentId);
    return NextResponse.json({ message: "답변이 삭제되었습니다." });
  } catch (error) {
    console.error(
      `[api/admin/inquiries/${inquiryId}/comments/${commentId}][DELETE]`,
      error,
    );
    return NextResponse.json({ message: "답변 삭제에 실패했습니다." }, { status: 500 });
  }
}
