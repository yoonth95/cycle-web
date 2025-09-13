"use client";

import { SectionHeader } from "@/components/common";
import { ContactForm } from "@/components/features/contact/page";
import type { ContactPageLayoutRendererProps } from "@/types/contact";

export function ContactPageLayoutRenderer({ layoutData }: ContactPageLayoutRendererProps) {
  return (
    <>
      {layoutData.sections.map((section) => {
        switch (section.section) {
          case "contact-header":
            return (
              <SectionHeader
                key={section.id}
                title={section.title}
                description={section.description}
              />
            );
          case "contact-form":
            return (
              <ContactForm
                key={section.id}
                formConfig={section.formConfig}
                className={section.className}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
