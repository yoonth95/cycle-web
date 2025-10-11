import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { revokeSessionByToken } from "@/lib/admin/repository";
import { clearAdminSessionCookie } from "@/lib/admin/session";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (token) {
    try {
      await revokeSessionByToken(token);
    } catch (error) {
      console.error("[api/admin/logout]", error);
    }
  }

  const response = NextResponse.json({ message: "로그아웃되었습니다." });
  clearAdminSessionCookie(response);
  return response;
}
