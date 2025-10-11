import { getSupabaseServiceRoleClient } from "@/lib/supabase";

export interface AdminNoticeRecord {
  id: string;
  title: string;
  content: { ops?: Array<Record<string, unknown>> } | string | null;
  is_published: boolean;
  is_pinned: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export const fetchAdminNotices = async (): Promise<AdminNoticeRecord[]> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw error;
  }

  return (data as AdminNoticeRecord[]) ?? [];
};

export const fetchAdminNoticeById = async (id: string): Promise<AdminNoticeRecord | null> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase.from("notices").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return (data as AdminNoticeRecord | null) ?? null;
};

export interface UpsertNoticeInput {
  title: string;
  content: {
    ops: Array<Record<string, unknown>>;
  };
  isPublished: boolean;
  isPinned: boolean;
}

export const createAdminNotice = async (input: UpsertNoticeInput) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase
    .from("notices")
    .insert({
      title: input.title,
      content: input.content,
      is_published: input.isPublished,
      is_pinned: input.isPinned,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as AdminNoticeRecord;
};

export const updateAdminNotice = async (id: string, input: UpsertNoticeInput) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase
    .from("notices")
    .update({
      title: input.title,
      content: input.content,
      is_published: input.isPublished,
      is_pinned: input.isPinned,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as AdminNoticeRecord;
};

export const deleteAdminNotice = async (id: string) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) {
    throw error;
  }
};
