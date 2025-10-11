import { AdminNoticePageHeader, AdminNoticeTable } from "@/components/features/admin/notices";
import { fetchAdminNotices } from "@/lib/admin/notices";

export default async function AdminNoticesPage() {
  const notices = await fetchAdminNotices();

  return (
    <div className="space-y-8">
      <AdminNoticePageHeader actionHref="/admin/notices/new" />
      <AdminNoticeTable notices={notices} />
    </div>
  );
}
