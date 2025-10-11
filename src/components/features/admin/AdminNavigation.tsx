"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export interface AdminNavItem {
  href: string;
  label: string;
  description?: string;
}

const navItems: AdminNavItem[] = [
  { href: "/admin/dashboard", label: "대시보드" },
  { href: "/admin/site-editor", label: "사이트 에디터" },
  { href: "/admin/notices", label: "공지사항 관리" },
  { href: "/admin/inquiries", label: "문의사항" },
];

interface AdminNavigationProps {
  className?: string;
}

const AdminNavigation = ({ className }: AdminNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex w-full items-center gap-2 overflow-x-auto", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{item.label}</span>
            {item.description ? (
              <span className="text-muted-foreground ml-2 hidden text-xs lg:inline">
                {item.description}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminNavigation;
