import { BicycleStylePageSectionRenderer } from "@/components/features/bicycles/style";
import type {
  BicycleLayoutData,
  BicyclePageContentData,
  BicycleContentSection,
} from "@/types/bicycle";

interface BicycleStylePageLayoutRendererProps {
  layoutData: BicycleLayoutData;
  contentData: BicyclePageContentData;
}

export function BicycleStylePageLayoutRenderer({
  layoutData,
  contentData,
}: BicycleStylePageLayoutRendererProps) {
  const layout = layoutData.layout;

  if (layout.type !== "bicycles-style-page") {
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
    <div className={layout.className}>
      <div className={layout.content.className}>
        {orderedSections.map((section: BicycleContentSection) => (
          <BicycleStylePageSectionRenderer key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
