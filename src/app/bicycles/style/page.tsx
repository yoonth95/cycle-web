import { notFound } from "next/navigation";
import { BicycleStylePageLayoutRenderer } from "@/components/features/bicycles/style";
import { getBicycleStyleLayout, getBicycleStyleContent } from "@/lib/bicycle";

export const revalidate = 300;

export default async function StylePage() {
  const [layoutData, contentData] = await Promise.all([
    getBicycleStyleLayout(),
    getBicycleStyleContent(),
  ]);

  if (!layoutData || !contentData) notFound();

  return <BicycleStylePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
