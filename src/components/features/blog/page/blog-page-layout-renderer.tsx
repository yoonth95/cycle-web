import { SectionHeader } from "@/components/common";
import { BlogListSection } from "@/components/features/blog/page";
import type { BlogLayoutContent } from "@/types/blog";

interface BlogPageLayoutRendererProps {
  layoutData: BlogLayoutContent;
}

export function BlogPageLayoutRenderer({ layoutData }: BlogPageLayoutRendererProps) {
  const sortedSections = layoutData.sections.sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedSections.map((section) => {
        switch (section.section) {
          case "blog-header":
            return (
              <SectionHeader
                key={section.id}
                title={section.title}
                description={section.description}
              />
            );

          case "blog-list":
            return (
              <BlogListSection
                key={section.id}
                className={section.className}
                defaultValues={section.defaultValues}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
