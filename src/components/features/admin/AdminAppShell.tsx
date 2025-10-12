import Link from "next/link";
import type { ReactNode } from "react";

import type { AdminSession } from "@/lib/admin/types";
import { AdminNavigation, AdminLogoutButton } from "@/components/features/admin";

interface AdminAppShellProps {
  session: AdminSession;
  children: ReactNode;
}

const AdminAppShell = ({ session, children }: AdminAppShellProps) => {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-card/30 border-b backdrop-blur">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 md:px-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <Link href="/admin/dashboard" className="text-lg font-semibold">
              중동역점 관리자
            </Link>
            <div className="text-muted-foreground flex items-center gap-4 text-sm md:justify-end">
              <div className="flex flex-col text-right sm:hidden">
                <span className="text-foreground font-medium">{session.user.username}</span>
              </div>
              <div className="hidden flex-col text-right sm:flex">
                <span className="text-foreground font-medium">{session.user.username}</span>
                {session.user.email ? <span>{session.user.email}</span> : null}
              </div>
              <AdminLogoutButton />
            </div>
          </div>
          <AdminNavigation className="pb-1 md:pb-0" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:px-6">
        <div className="bg-card rounded-lg border p-6 shadow-sm">{children}</div>
      </main>
    </div>
  );
};

export default AdminAppShell;
