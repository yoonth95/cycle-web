import { SectionHeader } from "@/components/common";
import { ContactsHeaderSectionProps } from "@/types/contact";

export function ContactsHeaderSection({ data }: ContactsHeaderSectionProps) {
  return (
    <section className={data.className}>
      <SectionHeader title={data.title} description={data.description} />
    </section>
  );
}
