import { notFound } from "next/navigation";

import { AdminNoticeForm } from "@/components/features/admin/notices";
import { fetchAdminNoticeById } from "@/lib/admin/notices";

export default async function AdminNoticeEditPage({
  params,
}: {
  params: Promise<{ noticeId: string }>;
}) {
  const { noticeId } = await params;
  const notice = await fetchAdminNoticeById(noticeId);

  if (!notice) {
    notFound();
  }

  return <AdminNoticeForm mode="edit" notice={notice} />;
}
