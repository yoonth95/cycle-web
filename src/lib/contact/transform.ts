import { deltaToHtml, type QuillDelta } from "@/lib/home/quill";
import {
  ContactLayoutDataSchema,
  ContactFormDataSchema,
  type ContactLayoutData,
  type ContactFormData,
  ContactHeaderSection,
} from "@/types/contact";

function transformContactHeaderSection(section: ContactHeaderSection): ContactHeaderSection {
  let transformedTitle = section.title;
  let transformedDescription = section.description;

  // title이 퀼 델타 객체인 경우 HTML로 변환
  if (typeof section.title === "object" && section.title !== null) {
    transformedTitle = deltaToHtml(section.title as QuillDelta);
  }

  // description이 퀼 델타 객체인 경우 HTML로 변환
  if (typeof section.description === "object" && section.description !== null) {
    transformedDescription = deltaToHtml(section.description as QuillDelta);
  }

  return {
    ...section,
    title: transformedTitle,
    description: transformedDescription,
  };
}

/**
 * Contact 레이아웃 데이터를 변환하고 zod로 검증
 */
export function transformContactLayout(rawData: unknown): ContactLayoutData | null {
  try {
    const validatedData = ContactLayoutDataSchema.parse(rawData);

    const transformedSections = validatedData.layout.content.sections.map((section) => {
      if (section.section === "contact-header") {
        return transformContactHeaderSection(section);
      }
      return section;
    });

    const transformedLayout: ContactLayoutData = {
      layout: {
        ...validatedData.layout,
        content: {
          ...validatedData.layout.content,
          sections: transformedSections,
        },
      },
    };

    // 변환된 데이터를 다시 zod로 검증
    return ContactLayoutDataSchema.parse(transformedLayout);
  } catch (error) {
    console.error("[transformContactLayout] 변환 또는 검증 실패:", error);
    return null;
  }
}

/**
 * Contact 폼 데이터를 변환하고 zod로 검증
 */
export function transformContactFormData(rawData: unknown): ContactFormData | null {
  try {
    // 폼 데이터 검증
    const validatedData = ContactFormDataSchema.parse(rawData);

    // email 필드 추가
    const resultData: ContactFormData = {
      ...validatedData,
      email: `${validatedData.emailLocal}@${validatedData.emailDomain}`,
    };

    return resultData;
  } catch (error) {
    console.error("[transformContactFormData] 변환 또는 검증 실패:", error);
    return null;
  }
}
