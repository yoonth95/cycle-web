import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <main className="min-h-[calc(100vh-64px)]">{children}</main>;
}
