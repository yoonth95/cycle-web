import { notFound } from "next/navigation";
import { BicyclePageLayoutRenderer } from "@/components/features/bicycles/page";
import { getBicycleLayout, getBicycleContent } from "@/lib/bicycle";

export default async function BicyclesPage() {
  const [layoutData, contentData] = await Promise.all([getBicycleLayout(), getBicycleContent()]);

  if (!layoutData || !contentData) notFound();

  return <BicyclePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
