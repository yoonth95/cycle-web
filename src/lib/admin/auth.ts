import bcrypt from "bcrypt";

import { ADMIN_MAX_FAILED_ATTEMPTS } from "./constants";
import {
  fetchAdminUserByIdentifier,
  recordFailedLogin,
  recordSuccessfulLogin,
} from "./repository";
import type {
  AdminAuthAuditContext,
  AdminLoginPayload,
  AdminLoginResult,
  AdminLoginSuccess,
} from "./types";

const GENERIC_FAILURE_MESSAGE = "아이디 또는 비밀번호가 올바르지 않습니다.";
const LOCKED_MESSAGE = "계정이 잠겼습니다. 관리자에게 문의해주세요.";

export const loginAdmin = async (
  payload: AdminLoginPayload,
  context: AdminAuthAuditContext,
): Promise<AdminLoginResult> => {
  const identifier = payload.identifier.trim();
  const password = payload.password;

  if (!identifier || !password) {
    return {
      type: "error",
      message: GENERIC_FAILURE_MESSAGE,
    };
  }

  const user = await fetchAdminUserByIdentifier(identifier);

  if (!user) {
    await recordFailedLogin(null, "invalid_credentials", context);
    return {
      type: "error",
      message: GENERIC_FAILURE_MESSAGE,
    };
  }

  if (user.is_locked) {
    await recordFailedLogin(user, "account_locked", context);
    return {
      type: "error",
      message: LOCKED_MESSAGE,
      locked: true,
      remainingAttempts: 0,
    };
  }

  if (!user.password_hash) {
    await recordFailedLogin(user, "missing_password_hash", context);
    return {
      type: "error",
      message: GENERIC_FAILURE_MESSAGE,
      remainingAttempts: Math.max(ADMIN_MAX_FAILED_ATTEMPTS - user.failed_attempts, 0),
    };
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatches) {
    const attemptsAfterFailure = Math.min(user.failed_attempts + 1, ADMIN_MAX_FAILED_ATTEMPTS);
    await recordFailedLogin(user, "invalid_credentials", context);
    return {
      type: "error",
      message: attemptsAfterFailure >= ADMIN_MAX_FAILED_ATTEMPTS ? LOCKED_MESSAGE : GENERIC_FAILURE_MESSAGE,
      locked: attemptsAfterFailure >= ADMIN_MAX_FAILED_ATTEMPTS,
      remainingAttempts: Math.max(ADMIN_MAX_FAILED_ATTEMPTS - attemptsAfterFailure, 0),
    };
  }

  const { session, token } = await recordSuccessfulLogin(user, context);

  return {
    type: "success",
    sessionToken: token,
    session,
  } satisfies AdminLoginSuccess;
};
