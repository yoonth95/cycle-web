import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin/session";
import { fetchAdminInquiries } from "@/lib/admin/inquiries";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const inquiries = await fetchAdminInquiries();
    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("[api/admin/inquiries][GET]", error);
    return NextResponse.json({ message: "Failed to load inquiries" }, { status: 500 });
  }
}
