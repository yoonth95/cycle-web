import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/features/admin";
import { getAdminSession } from "@/lib/admin/session";

export default async function AdminEntryPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
      <div className="bg-card mx-auto w-full max-w-[500px] rounded-xl border p-8 shadow-xl">
        <AdminLoginForm />
      </div>
    </div>
  );
}
