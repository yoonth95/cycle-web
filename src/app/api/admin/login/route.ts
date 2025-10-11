import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { loginAdmin } from "@/lib/admin/auth";
import { attachAdminSessionCookie } from "@/lib/admin/session";

const payloadSchema = z.object({
  identifier: z.string().min(1, "아이디를 입력해주세요.").max(100),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다.").max(128),
});

const extractClientIp = (req: NextRequest) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  req.headers.get("x-real-ip") ??
  req.headers.get("cf-connecting-ip") ??
  req.headers.get("x-forwarded") ??
  req.headers.get("forwarded-for") ??
  req.headers.get("forwarded") ??
  null;

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parseResult = payloadSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: "요청 형식이 유효하지 않습니다.",
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const payload = parseResult.data;
    const result = await loginAdmin(payload, {
      ipAddress: extractClientIp(req),
      userAgent: req.headers.get("user-agent"),
    });

    if (result.type === "error") {
      return NextResponse.json(
        {
          message: result.message,
          locked: result.locked ?? false,
          remainingAttempts: result.remainingAttempts,
        },
        { status: result.locked ? 423 : 401 },
      );
    }

    const response = NextResponse.json({
      message: "로그인되었습니다.",
      session: {
        id: result.session.sessionId,
        user: result.session.user,
        expiresAt: result.session.expiresAt.toISOString(),
      },
    });

    attachAdminSessionCookie(response, result.sessionToken, result.session.expiresAt);

    return response;
  } catch (error) {
    console.error("[api/admin/login]", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
