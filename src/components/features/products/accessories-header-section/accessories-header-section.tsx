import SectionHeader from "@/components/common/section-header";
import type { AccessoriesHeaderSectionProps } from "@/types/products";

export function AccessoriesHeaderSection({ data }: AccessoriesHeaderSectionProps) {
  return (
    <section>
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={data.title} description={data.description} />
      </div>
    </section>
  );
}
