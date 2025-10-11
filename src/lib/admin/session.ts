import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

import {
  ADMIN_MAX_FAILED_ATTEMPTS,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
} from "./constants";
import { revokeSessionByToken, verifySessionToken } from "./repository";
import type { AdminSession } from "./types";

const isProduction = process.env.NODE_ENV === "production";

export const attachAdminSessionCookie = (
  response: NextResponse,
  token: string,
  expiresAt: Date,
) => {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
    expires: expiresAt,
  });
};

export const clearAdminSessionCookie = (response: NextResponse) => {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
};

export const getAdminSession = async (): Promise<AdminSession | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  try {
    const session = await verifySessionToken(token);
    if (!session) {
      await revokeSessionByToken(token);
      return null;
    }

    return {
      sessionId: session.id,
      expiresAt: new Date(session.expires_at),
      user: {
        id: session.user.id,
        username: session.user.username,
        email: session.user.email,
        created_at: session.user.created_at,
        updated_at: session.user.updated_at,
      },
    };
  } catch (error) {
    console.log(error);
    await revokeSessionByToken(token);
    return null;
  }
};

export const requireAdminSession = async (): Promise<AdminSession> => {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
};

export const getRemainingAttempts = (failedAttempts: number) => {
  const remaining = ADMIN_MAX_FAILED_ATTEMPTS - failedAttempts;
  return remaining > 0 ? remaining : 0;
};
