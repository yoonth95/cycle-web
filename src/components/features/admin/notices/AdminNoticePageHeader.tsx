import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

interface AdminNoticePageHeaderProps {
  actionHref: string;
}

export function AdminNoticePageHeader({ actionHref }: AdminNoticePageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">공지사항 관리</h1>
        <p className="text-muted-foreground">
          사용자에게 노출되는 공지사항을 조회하고 관리할 수 있습니다.
        </p>
      </div>
      <Link href={actionHref} className={buttonVariants({ size: "lg" })}>
        등록
      </Link>
    </header>
  );
}

export default AdminNoticePageHeader;
