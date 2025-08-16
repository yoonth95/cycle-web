import type {
  BicycleLayoutData,
  BicyclePageContentData,
  BicycleContentSection,
} from "@/types/bicycle";
import { BicyclePageSectionRenderer } from "@/components/features/bicycles/page";

interface BicyclePageLayoutRendererProps {
  layoutData: BicycleLayoutData;
  contentData: BicyclePageContentData;
}

export function BicyclePageLayoutRenderer({
  layoutData,
  contentData,
}: BicyclePageLayoutRendererProps) {
  const layout = layoutData.layout;

  if (layout.type !== "bicycles-page") {
    console.warn("layout type이 잘못되었습니다, layout.type:", layout.type);
    return null;
  }

  // 섹션들을 order에 따라 정렬
  const orderedSections = [...contentData.sections].sort((a, b) => {
    const aOrder = layout.content.sections.find((s) => s.section === a.section)?.order ?? 0;
    const bOrder = layout.content.sections.find((s) => s.section === b.section)?.order ?? 0;
    return aOrder - bOrder;
  });

  return (
    <section className={layout.className}>
      <div className={layout.content.className}>
        {orderedSections.map((section: BicycleContentSection) => (
          <BicyclePageSectionRenderer key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
