export interface AdminUserRecord {
  id: string;
  username: string;
  email: string | null;
  password_hash: string;
  failed_attempts: number;
  is_locked: boolean;
  locked_at: string | null;
  last_failed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminLoginLogRecord {
  id: string;
  admin_user_id: string | null;
  username: string | null;
  ip_address: string | null;
  user_agent: string | null;
  success: boolean;
  failure_reason: string | null;
  created_at: string;
}

export interface AdminSessionRecord {
  id: string;
  admin_user_id: string;
  token_hash: string;
  expires_at: string;
  created_at: string;
  revoked_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface AdminSession {
  sessionId: string;
  user: Pick<
    AdminUserRecord,
    "id" | "username" | "email" | "created_at" | "updated_at"
  >;
  expiresAt: Date;
}

export interface AdminAuthAuditContext {
  ipAddress: string | null;
  userAgent: string | null;
}

export interface AdminLoginPayload {
  identifier: string;
  password: string;
}

export interface AdminLoginSuccess {
  type: "success";
  sessionToken: string;
  session: AdminSession;
}

export interface AdminLoginFailure {
  type: "error";
  message: string;
  locked?: boolean;
  remainingAttempts?: number;
}

export type AdminLoginResult = AdminLoginSuccess | AdminLoginFailure;
