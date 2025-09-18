import React from "react";
import { NoticesHeaderSection, NoticesTableSection } from "@/components/features/notices/page";
import type {
  NoticesLayoutContent,
  NoticesLayoutContentHeader,
  NoticesLayoutContentTable,
  NoticesSectionMap,
} from "@/types/notice";

function findSectionData<T extends keyof NoticesSectionMap>(
  sectionKey: T,
  contentData: NoticesLayoutContent,
): NoticesSectionMap[T] | undefined {
  return contentData.sections.find((s) => s.section === sectionKey) as
    | NoticesSectionMap[T]
    | undefined;
}

export function NoticesPageLayoutContentRenderer({
  layoutData,
}: {
  layoutData: NoticesLayoutContent;
}) {
  const orderedSections = [...layoutData.sections].sort((a, b) => a.order - b.order);

  return (
    <>
      {orderedSections.map((section) => {
        switch (section.section) {
          case "notices-header": {
            const data = findSectionData("notices-header", layoutData) as
              | NoticesLayoutContentHeader
              | undefined;
            if (!data) return null;
            return <NoticesHeaderSection key={section.id} data={data} />;
          }
          case "notices-table": {
            const data = findSectionData("notices-table", layoutData) as
              | NoticesLayoutContentTable
              | undefined;
            if (!data) return null;
            return <NoticesTableSection key={section.id} NoticesTableData={data} />;
          }
          default:
            console.warn(`Unknown notices content section type: ${section}`);
            return null;
        }
      })}
    </>
  );
}

export default NoticesPageLayoutContentRenderer;
