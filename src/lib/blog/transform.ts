import { deltaToHtml, type QuillDelta } from "@/lib/home/quill";
import {
  BlogLayoutDataSchema,
  BlogItemSchema,
  BlogListSchema,
  type BlogLayoutData,
  type BlogHeaderSection,
  type BlogItem,
  type BlogList,
  type DbBlogRow,
} from "@/types/blog";

/**
 * Blog 아이템 데이터를 변환하고 zod로 검증
 */
export function transformBlogItem(rawData: DbBlogRow): BlogItem | null {
  try {
    let transformedDescription = "";
    let images: string[] = [];

    // description이 퀼 델타 객체인 경우 HTML로 변환
    if (typeof rawData.description === "object" && rawData.description !== null) {
      transformedDescription = deltaToHtml(rawData.description as QuillDelta);
    } else if (typeof rawData.description === "string") {
      transformedDescription = rawData.description;
    }

    // images가 배열인지 확인하고 파싱
    if (Array.isArray(rawData.images)) {
      images = rawData.images;
    } else if (typeof rawData.images === "string") {
      try {
        const parsedImages = JSON.parse(rawData.images);
        if (Array.isArray(parsedImages)) {
          images = parsedImages;
        }
      } catch {
        images = [];
      }
    }

    const transformedBlog: BlogItem = {
      id: rawData.id,
      title: rawData.title,
      description: transformedDescription,
      images,
      link: rawData.link,
      publishedAt: rawData.published_at,
      imageCount: images.length,
    };

    // 변환된 데이터를 Zod로 검증하여 안전성 확보
    return BlogItemSchema.parse(transformedBlog);
  } catch (error) {
    console.error("[transformBlogItem] 변환 또는 검증 실패:", error);
    return null;
  }
}

/**
 * Blog 리스트 데이터를 변환하고 zod로 검증
 */
export function transformBlogList(rawData: DbBlogRow[]): BlogList {
  try {
    const transformedBlogs: BlogItem[] = rawData
      .map(transformBlogItem)
      .filter((blog): blog is BlogItem => blog !== null);

    return BlogListSchema.parse(transformedBlogs);
  } catch (error) {
    console.error("[transformBlogList] 변환 또는 검증 실패:", error);
    return [];
  }
}

/**
 * blog-header 섹션의 title, description을 deltaToHtml로 변환
 */
function transformBlogHeaderSection(section: BlogHeaderSection): BlogHeaderSection {
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
 * Blog 레이아웃 데이터를 변환하고 zod로 검증
 */
export function transformBlogLayout(rawData: unknown): BlogLayoutData | null {
  try {
    const validatedData = BlogLayoutDataSchema.parse(rawData);

    // sections 배열의 각 섹션을 변환
    const transformedSections = validatedData.layout.content.sections.map((section) => {
      // blog-header 섹션인 경우 deltaToHtml 변환 적용
      if (section.section === "blog-header") {
        return transformBlogHeaderSection(section);
      }

      // 다른 섹션들은 그대로 반환
      return section;
    });

    const transformedLayout: BlogLayoutData = {
      layout: {
        ...validatedData.layout,
        content: {
          ...validatedData.layout.content,
          sections: transformedSections,
        },
      },
    };

    // 변환된 데이터를 다시 zod로 검증
    return BlogLayoutDataSchema.parse(transformedLayout);
  } catch (error) {
    console.error("[transformBlogLayout] 변환 또는 검증 실패:", error);
    return null;
  }
}
