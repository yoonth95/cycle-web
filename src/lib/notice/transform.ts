import "server-only";

import { deltaToHtml, type QuillDelta } from "@/lib/home/quill";
import {
  NoticesLayoutDataSchema,
  NoticeDetailSchema,
  type NoticesLayoutData,
  type NoticesLayoutContentHeader,
  type NoticeDetailType,
} from "@/types/notice";

/**
 * Notice 상세 데이터를 변환하고 zod로 검증
 */
export function transformNoticeDetail(rawData: unknown): NoticeDetailType | null {
  try {
    // 먼저 Zod로 검증
    const validatedData = NoticeDetailSchema.parse(rawData);

    let transformedContent = validatedData.content;

    // content가 퀼 델타 객체인 경우 HTML로 변환
    if (typeof validatedData.content === "object" && validatedData.content !== null) {
      transformedContent = deltaToHtml(validatedData.content as QuillDelta);
    }

    const transformedNotice: NoticeDetailType = {
      ...validatedData,
      content: transformedContent,
    };

    // 변환된 데이터를 다시 Zod로 검증하여 안전성 확보
    return NoticeDetailSchema.parse(transformedNotice);
  } catch (error) {
    console.error("[transformNoticeDetail] 변환 또는 검증 실패:", error);
    return null;
  }
}

/**
 * notices-header 섹션의 title, description을 deltaToHtml로 변환
 */
function transformNoticesHeaderSection(
  section: NoticesLayoutContentHeader,
): NoticesLayoutContentHeader {
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
 * Notices 레이아웃 데이터를 변환하고 zod로 검증
 */
export function transformNoticesLayout(rawData: unknown): NoticesLayoutData | null {
  try {
    const validatedData = NoticesLayoutDataSchema.parse(rawData);

    // sections 배열의 각 섹션을 변환
    const transformedSections = validatedData.layout.content.sections.map((section) => {
      // notices-header 섹션인 경우 deltaToHtml 변환 적용
      if (section.section === "notices-header") {
        return transformNoticesHeaderSection(section);
      }

      // 다른 섹션들은 그대로 반환
      return section;
    });

    const transformedLayout: NoticesLayoutData = {
      layout: {
        ...validatedData.layout,
        content: {
          ...validatedData.layout.content,
          sections: transformedSections,
        },
      },
    };

    // 변환된 데이터를 다시 zod로 검증
    return NoticesLayoutDataSchema.parse(transformedLayout);
  } catch (error) {
    console.error("[transformNoticesLayout] 변환 또는 검증 실패:", error);
    return null;
  }
}
