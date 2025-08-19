import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `삼천리자전거`,
  description: `자전거 목록`,
};

export default async function StyleCategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!category) {
    notFound();
  }

  return <>{children}</>;
}
