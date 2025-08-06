import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryInfoSync } from "@/utils/bicycle-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categoryData = getCategoryInfoSync(category);

  if (!categoryData) {
    return { title: "카테고리를 찾을 수 없음" };
  }

  return {
    title: `${categoryData.title} | 삼천리자전거`,
    description: categoryData.description,
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
  const categoryData = getCategoryInfoSync(category);

  if (!categoryData) {
    notFound();
  }

  return <>{children}</>;
}
