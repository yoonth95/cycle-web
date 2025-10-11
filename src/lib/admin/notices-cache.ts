import { invalidatePageCache } from "@/lib/common/page-server";

export async function invalidateNoticesCache(noticeId?: string) {
  const { revalidatePath } = await import("next/cache");

  await invalidatePageCache("notices");

  if (noticeId) {
    revalidatePath(`/notices/${noticeId}`);
  }
}

