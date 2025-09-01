import type {
  BicycleLayoutData,
  BicyclePageContentData,
  BicycleContentSection,
} from "@/types/bicycle";
import { BicyclePageSectionRenderer } from "@/components/features/bicycles/page";
import { PerformanceTracker } from "@/components/common/performance-tracker";

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
      {/* 성능 측정 컴포넌트 - UI를 렌더링하지 않음 */}
      <PerformanceTracker currentPath="/bicycles" />

      <div className={layout.content.className}>
        {orderedSections.map((section: BicycleContentSection) => (
          <BicyclePageSectionRenderer key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
