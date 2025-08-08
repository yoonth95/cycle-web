import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // 서버 사이드에서만 호출되므로 콘솔 경고로 충분
  // 런타임에 Header 호출 시 throw 되지 않도록, 호출부에서 예외 처리 가능
  console.warn("Supabase env not configured: SUPABASE_URL / SUPABASE_ANON_KEY");
}

export const supabase = createClient(SUPABASE_URL ?? "", SUPABASE_ANON_KEY ?? "", {
  auth: { persistSession: false },
});
