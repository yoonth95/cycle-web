import { ContactsForm } from "@/components/features/contacts/new";
import { ContactsFormSectionProps } from "@/types/contact";

export function ContactsFormSection({ data }: ContactsFormSectionProps) {
  return (
    <section className={data.className}>
      <ContactsForm formConfig={data.formConfig} />
    </section>
  );
}
