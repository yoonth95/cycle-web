import { getSupabaseServiceRoleClient } from "@/lib/supabase";

export interface AdminInquiryRecord {
  id: string;
  title: string;
  description: string;
  author: string;
  email: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  contact_comments: {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
  }[];
}

export const fetchAdminInquiries = async (): Promise<AdminInquiryRecord[]> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase
    .from("contacts")
    .select(`
      id,
      title,
      description,
      author,
      email,
      is_public,
      created_at,
      updated_at,
      contact_comments(id, content, created_at, updated_at)
    `)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    throw error;
  }

  return (data as AdminInquiryRecord[]) ?? [];
};

export const replyToInquiry = async (contactId: string, content: string) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { error } = await supabase.from("contact_comments").insert({
    contact_id: contactId,
    content,
  });

  if (error) {
    throw error;
  }
};
