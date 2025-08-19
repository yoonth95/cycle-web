import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `${category} | 삼천리자전거`,
    description: `${category} 자전거 목록`,
  };
}

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
