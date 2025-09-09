import { SectionHeader } from "@/components/common";
import { NoticesHeaderSectionProps } from "@/types/notice";

export function NoticesHeaderSection({ data }: NoticesHeaderSectionProps) {
  return (
    <section className={data.className}>
      <SectionHeader title={data.title} description={data.description} />
    </section>
  );
}
