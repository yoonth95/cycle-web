import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminAppShell } from "@/components/features/admin";
import { getAdminSession } from "@/lib/admin/session";

export default async function AdminAuthenticatedLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin");
  }

  return <AdminAppShell session={session}>{children}</AdminAppShell>;
}
