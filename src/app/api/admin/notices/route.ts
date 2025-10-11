import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getAdminSession } from "@/lib/admin/session";
import { createAdminNotice, fetchAdminNotices } from "@/lib/admin/notices";
import { invalidateNoticesCache } from "@/lib/admin/notices-cache";
import { isDeltaEmpty } from "@/lib/home/quill";
import { cloneDelta, QuillDeltaSchema } from "@/lib/quill/delta";

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

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const notices = await fetchAdminNotices();
    return NextResponse.json({ notices });
  } catch (error) {
    console.error("[api/admin/notices][GET]", error);
    return NextResponse.json({ message: "Failed to load notices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const result = upsertSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const payload = {
      ...result.data,
      content: cloneDelta(result.data.content),
    };

    const notice = await createAdminNotice(payload);
    await invalidateNoticesCache(notice.id);
    return NextResponse.json({ notice });
  } catch (error) {
    console.error("[api/admin/notices][POST]", error);
    return NextResponse.json({ message: "Failed to create notice" }, { status: 500 });
  }
}
