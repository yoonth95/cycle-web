import { getSupabaseServiceRoleClient } from "@/lib/supabase";

import { ADMIN_LOGIN_LOGS_TABLE, ADMIN_USERS_TABLE } from "./constants";
import type { AdminLoginLogRecord } from "./types";

export interface AdminDashboardSnapshot {
  totalNotices: number;
  totalContacts: number;
  lockedAccounts: number;
  recentLoginLogs: AdminLoginLogRecord[];
}

export const fetchAdminDashboardSnapshot = async (): Promise<AdminDashboardSnapshot> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const [
    { count: totalNotices = 0, error: noticesError },
    { count: totalContacts = 0, error: contactsError },
  ] = await Promise.all([
    supabase.from("notices").select("id", { count: "exact", head: true }),
    supabase.from("contacts").select("id", { count: "exact", head: true }),
  ]);

  if (noticesError) {
    throw noticesError;
  }

  if (contactsError) {
    throw contactsError;
  }

  const { count: lockedAccounts = 0, error: lockedError } = await supabase
    .from(ADMIN_USERS_TABLE)
    .select("id", { count: "exact", head: true })
    .eq("is_locked", true);

  if (lockedError) {
    throw lockedError;
  }

  const { data: recentLogs = [], error: logsError } = await supabase
    .from(ADMIN_LOGIN_LOGS_TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (logsError) {
    throw logsError;
  }

  return {
    totalNotices: totalNotices || 0,
    totalContacts: totalContacts || 0,
    lockedAccounts: lockedAccounts || 0,
    recentLoginLogs: recentLogs as AdminLoginLogRecord[],
  };
};
