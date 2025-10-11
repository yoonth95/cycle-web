import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getAdminSession } from "@/lib/admin/session";
import { deleteAdminNotice, updateAdminNotice } from "@/lib/admin/notices";
import { invalidateNoticesCache } from "@/lib/admin/notices-cache";
import { isDeltaEmpty } from "@/lib/home/quill";
import { cloneDelta, QuillDeltaSchema } from "@/lib/quill/delta";

type NoticeRouteContext = {
  params: Promise<{ noticeId: string }>;
};

const upsertSchema = z
  .object({
    title: z.string().min(1),
    content: QuillDeltaSchema,
    isPublished: z.boolean().default(false),
    isPinned: z.boolean().default(false),
  })
  .superRefine((value, ctx) => {
    if (isDeltaEmpty(value.content)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "내용을 입력해주세요.",
        path: ["content"],
      });
    }
  });

export async function PUT(
  req: NextRequest,
  context: NoticeRouteContext,
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { noticeId } = await context.params;

    const json = await req.json();
    const result = upsertSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const payload = {
      ...result.data,
      content: cloneDelta(result.data.content),
    };

    const notice = await updateAdminNotice(noticeId, payload);
    await invalidateNoticesCache(noticeId);
    return NextResponse.json({ notice });
  } catch (error) {
    console.error("[api/admin/notices/:id][PUT]", error);
    return NextResponse.json({ message: "Failed to update notice" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: NoticeRouteContext,
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { noticeId } = await context.params;
    await deleteAdminNotice(noticeId);
    await invalidateNoticesCache(noticeId);
    return NextResponse.json({ message: "Notice deleted" });
  } catch (error) {
    console.error("[api/admin/notices/:id][DELETE]", error);
    return NextResponse.json({ message: "Failed to delete notice" }, { status: 500 });
  }
}
