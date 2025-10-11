import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getAdminSession } from "@/lib/admin/session";
import {
  fetchSiteConfiguration,
  upsertSiteConfiguration,
} from "@/lib/admin/site-config";

const updateSchema = z.object({
  pageId: z.string().min(1),
  payload: z.record(z.unknown()),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const pageId = req.nextUrl.searchParams.get("pageId")?.trim();
  if (!pageId) {
    return NextResponse.json({ message: "pageId is required" }, { status: 400 });
  }

  try {
    const config = await fetchSiteConfiguration(pageId);
    return NextResponse.json({
      pageId,
      payload: config?.payload ?? {},
      updatedAt: config?.updated_at ?? null,
      updatedBy: config?.updated_by ?? null,
    });
  } catch (error) {
    console.error("[api/admin/site-config][GET]", error);
    return NextResponse.json({ message: "Failed to fetch site configuration" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const result = updateSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const { pageId, payload } = result.data;

    await upsertSiteConfiguration({
      pageId,
      payload,
      updatedBy: session.user.id,
    });

    return NextResponse.json({ message: "Configuration updated" });
  } catch (error) {
    console.error("[api/admin/site-config][PUT]", error);
    return NextResponse.json({ message: "Failed to update configuration" }, { status: 500 });
  }
}
