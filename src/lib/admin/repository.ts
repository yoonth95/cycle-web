import { createHash, randomBytes } from "node:crypto";

import { getSupabaseServiceRoleClient } from "@/lib/supabase";

import {
  ADMIN_LOGIN_LOGS_TABLE,
  ADMIN_MAX_FAILED_ATTEMPTS,
  ADMIN_SESSIONS_TABLE,
  ADMIN_SESSION_TTL_SECONDS,
  ADMIN_USERS_TABLE,
} from "./constants";
import type {
  AdminAuthAuditContext,
  AdminLoginLogRecord,
  AdminSession,
  AdminSessionRecord,
  AdminUserRecord,
} from "./types";

const hashingAlgorithm = "sha256";

const hashToken = (token: string) => createHash(hashingAlgorithm).update(token).digest("hex");

export const createSessionToken = () => randomBytes(48).toString("base64url");

export const fetchAdminUserByIdentifier = async (
  identifier: string,
): Promise<AdminUserRecord | null> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase
    .from(ADMIN_USERS_TABLE)
    .select("*")
    .ilike("username", identifier)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data) {
    return data as AdminUserRecord;
  }

  const { data: byEmail, error: emailErr } = await supabase
    .from(ADMIN_USERS_TABLE)
    .select("*")
    .ilike("email", identifier)
    .maybeSingle();

  if (emailErr) {
    throw emailErr;
  }

  return (byEmail as AdminUserRecord | null) ?? null;
};

export const recordFailedLogin = async (
  user: AdminUserRecord | null,
  reason: string,
  context: AdminAuthAuditContext,
) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const username = user ? user.username : null;
  const adminUserId = user ? user.id : null;

  if (user) {
    const failedAttempts = Math.min(user.failed_attempts + 1, ADMIN_MAX_FAILED_ATTEMPTS);
    const shouldLock = failedAttempts >= ADMIN_MAX_FAILED_ATTEMPTS && !user.is_locked;
    const updates: Partial<AdminUserRecord> = {
      failed_attempts: failedAttempts,
      last_failed_at: new Date().toISOString(),
    };

    if (shouldLock) {
      updates.is_locked = true;
      updates.locked_at = new Date().toISOString();
    }

    const { error: updateErr } = await supabase
      .from(ADMIN_USERS_TABLE)
      .update(updates)
      .eq("id", user.id);

    if (updateErr) {
      throw updateErr;
    }
  }

  const { error: logErr } = await supabase.from(ADMIN_LOGIN_LOGS_TABLE).insert({
    admin_user_id: adminUserId,
    username,
    success: false,
    failure_reason: reason,
    ip_address: context.ipAddress,
    user_agent: context.userAgent,
  });

  if (logErr) {
    throw logErr;
  }
};

export const recordSuccessfulLogin = async (
  user: AdminUserRecord,
  context: AdminAuthAuditContext,
): Promise<{ session: AdminSession; token: string }> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const token = createSessionToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000);

  const { data: session, error: sessionErr } = await supabase
    .from(ADMIN_SESSIONS_TABLE)
    .insert({
      admin_user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
      ip_address: context.ipAddress,
      user_agent: context.userAgent,
    })
    .select()
    .single();

  if (sessionErr) {
    throw sessionErr;
  }

  const { error: resetErr } = await supabase
    .from(ADMIN_USERS_TABLE)
    .update({
      failed_attempts: 0,
      is_locked: false,
      locked_at: null,
      last_failed_at: null,
    })
    .eq("id", user.id);

  if (resetErr) {
    throw resetErr;
  }

  const { error: logErr } = await supabase.from(ADMIN_LOGIN_LOGS_TABLE).insert({
    admin_user_id: user.id,
    username: user.username,
    success: true,
    failure_reason: null,
    ip_address: context.ipAddress,
    user_agent: context.userAgent,
  });

  if (logErr) {
    throw logErr;
  }

  return {
    token,
    session: {
      sessionId: (session as AdminSessionRecord).id,
      expiresAt,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    },
  };
};

export const verifySessionToken = async (
  token: string,
): Promise<(AdminSessionRecord & { user: AdminUserRecord }) | null> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const tokenHash = hashToken(token);
  const { data, error } = await supabase
    .from(ADMIN_SESSIONS_TABLE)
    .select(`*, user:${ADMIN_USERS_TABLE} (*)`)
    .eq("token_hash", tokenHash)
    .is("revoked_at", null)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const session = data as AdminSessionRecord & { user: AdminUserRecord };
  if (new Date(session.expires_at).getTime() < Date.now()) {
    await revokeSessionById(session.id);
    return null;
  }

  if (session.user.is_locked) {
    return null;
  }

  return session;
};

export const revokeSessionById = async (sessionId: string) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { error } = await supabase
    .from(ADMIN_SESSIONS_TABLE)
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (error) {
    throw error;
  }
};

export const revokeSessionByToken = async (token: string) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const tokenHash = hashToken(token);
  const { data, error } = await supabase
    .from(ADMIN_SESSIONS_TABLE)
    .select("id")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return;
  }

  await revokeSessionById((data as AdminSessionRecord).id);
};
