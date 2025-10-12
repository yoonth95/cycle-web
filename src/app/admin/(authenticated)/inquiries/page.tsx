import { AdminInquiryManager } from "@/components/features/admin";
import { fetchAdminInquiries } from "@/lib/admin/inquiries";

export default async function AdminInquiriesPage() {
  const inquiries = await fetchAdminInquiries();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">문의사항 관리</h1>
        <p className="text-muted-foreground">
          고객 문의를 확인하고 답변을 등록하면 실시간으로 사용자에게 전달됩니다.
        </p>
      </div>

      <AdminInquiryManager inquiries={inquiries} />
    </div>
  );
}
