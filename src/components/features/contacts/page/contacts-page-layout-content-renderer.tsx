import React from "react";
import {
  ContactsHeaderSection,
  ContactsTableSection,
  ContactsFormSection,
} from "@/components/features/contacts/page";
import type {
  ContactsLayoutContent,
  ContactsHeaderSection as ContactsHeaderSectionType,
  ContactsLayoutContentTable,
  ContactsFormSection as ContactsFormSectionType,
  ContactsSectionMap,
} from "@/types/contact";

function findSectionData<T extends keyof ContactsSectionMap>(
  sectionKey: T,
  contentData: ContactsLayoutContent,
): ContactsSectionMap[T] | undefined {
  return contentData.sections.find((s) => s.section === sectionKey) as
    | ContactsSectionMap[T]
    | undefined;
}

export function ContactsPageLayoutContentRenderer({
  layoutData,
}: {
  layoutData: ContactsLayoutContent;
}) {
  const orderedSections = [...layoutData.sections].sort((a, b) => a.order - b.order);

  return (
    <>
      {orderedSections.map((section) => {
        switch (section.section) {
          case "contacts-header": {
            const data = findSectionData("contacts-header", layoutData) as
              | ContactsHeaderSectionType
              | undefined;
            if (!data) return null;
            return <ContactsHeaderSection key={section.id} data={data} />;
          }
          case "contacts-table": {
            const data = findSectionData("contacts-table", layoutData) as
              | ContactsLayoutContentTable
              | undefined;
            if (!data) return null;
            return <ContactsTableSection key={section.id} ContactsTableData={data} />;
          }
          case "contacts-form": {
            const data = findSectionData("contacts-form", layoutData) as
              | ContactsFormSectionType
              | undefined;
            if (!data) return null;
            return <ContactsFormSection key={section.id} data={data} />;
          }
          default:
            console.warn(`Unknown contacts content section type: ${section}`);
            return null;
        }
      })}
    </>
  );
}

export default ContactsPageLayoutContentRenderer;
