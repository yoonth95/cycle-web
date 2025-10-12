import { getSupabaseServiceRoleClient } from "@/lib/supabase";
import {
  AdminInquiryRecordSchema,
  type AdminInquiryRecord,
} from "@/types/inquiry";

export type { AdminInquiryRecord } from "@/types/inquiry";

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

  const parsed = AdminInquiryRecordSchema.array().safeParse(data ?? []);
  if (!parsed.success) {
    console.error("[lib/admin/inquiries] Failed to parse admin inquiries", parsed.error.flatten());
    throw new Error("Invalid inquiry data received");
  }

  return parsed.data;
};

export async function replyToInquiry(
  contactId: string,
  content: string,
): Promise<AdminInquiryRecord> {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { error: insertError } = await supabase.from("contact_comments").insert({
    contact_id: contactId,
    content,
  });

  if (insertError) {
    throw insertError;
  }

  const { data: contactData, error: contactError } = await supabase
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
    .eq("id", contactId)
    .maybeSingle();

  if (contactError) {
    throw contactError;
  }

  if (!contactData) {
    throw new Error("Contact not found after inserting comment");
  }

  const parsed = AdminInquiryRecordSchema.safeParse(contactData);
  if (!parsed.success) {
    console.error("[lib/admin/inquiries] Failed to parse contact after reply", parsed.error.flatten());
    throw new Error("Invalid contact data received");
  }

  try {
    const { invalidateContactsCache } = await import("./inquiries-cache");
    await invalidateContactsCache(contactId);
  } catch (cacheError) {
    console.error(
      "[lib/admin/inquiries] Failed to invalidate contacts cache after reply",
      cacheError,
    );
  }

  return parsed.data;
}

export async function updateInquiryComment(
  contactId: string,
  commentId: string,
  content: string,
) {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { error } = await supabase
    .from("contact_comments")
    .update({ content })
    .eq("id", commentId)
    .eq("contact_id", contactId)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  try {
    const { invalidateContactsCache } = await import("./inquiries-cache");
    await invalidateContactsCache(contactId);
  } catch (cacheError) {
    console.error(
      "[lib/admin/inquiries] Failed to invalidate contacts cache after update",
      cacheError,
    );
  }
}

export async function deleteInquiryComment(contactId: string, commentId: string) {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { error } = await supabase
    .from("contact_comments")
    .delete()
    .eq("id", commentId)
    .eq("contact_id", contactId)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  try {
    const { invalidateContactsCache } = await import("./inquiries-cache");
    await invalidateContactsCache(contactId);
  } catch (cacheError) {
    console.error(
      "[lib/admin/inquiries] Failed to invalidate contacts cache after delete",
      cacheError,
    );
  }
}
