import { getSupabaseServiceRoleClient } from "@/lib/supabase";

export interface SiteConfigurationRecord {
  id: string;
  page_id: string;
  payload: Record<string, unknown>;
  updated_at: string;
  updated_by: string | null;
}

export const fetchSiteConfiguration = async (pageId: string): Promise<SiteConfigurationRecord | null> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase
    .from("site_configurations")
    .select("*")
    .eq("page_id", pageId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as SiteConfigurationRecord | null) ?? null;
};

export const fetchAllSiteConfigurations = async (): Promise<SiteConfigurationRecord[]> => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { data, error } = await supabase
    .from("site_configurations")
    .select("*")
    .order("page_id", { ascending: true });

  if (error) {
    throw error;
  }

  return (data as SiteConfigurationRecord[]) ?? [];
};

export interface UpsertSiteConfigurationInput {
  pageId: string;
  payload: Record<string, unknown>;
  updatedBy: string;
}

export const upsertSiteConfiguration = async (input: UpsertSiteConfigurationInput) => {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    throw new Error("Supabase service role client is not configured");
  }

  const { error } = await supabase
    .from("site_configurations")
    .upsert(
      {
        page_id: input.pageId,
        payload: input.payload,
        updated_by: input.updatedBy,
      },
      { onConflict: "page_id" },
    );

  if (error) {
    throw error;
  }
};
