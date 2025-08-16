import { z } from "zod";
import { deltaToHtml } from "@/lib/home/quill";

/**
 * 다양한 형태의 값을 HTML 문자열로 변환하는 유틸리티 함수
 * - string: 그대로 반환
 * - Quill Delta 객체: HTML로 변환
 * - 기타: 빈 문자열 반환
 */
export function toHtml(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "ops" in (value as Record<string, unknown>)) {
    return deltaToHtml(value as { ops?: Array<Record<string, unknown>> });
  }
  return "";
}

/**
 * DB row 데이터 정규화를 위한 기본 인터페이스
 */
export interface BaseNormalizationInput {
  section: string;
  data?: unknown;
}

/**
 * 섹션별 데이터 처리를 위한 핸들러 타입
 */
export type SectionHandler<T> = (data: T, toHtml: (value: unknown) => string) => unknown;

/**
 * 섹션별 핸들러 맵 타입
 */
export type SectionHandlerMap<T extends z.ZodTypeAny> = Record<string, SectionHandler<z.infer<T>>>;

/**
 * DB rows를 정규화하는 공통 함수
 * @param rows - DB에서 가져온 row 데이터 배열
 * @param schema - 섹션 데이터 검증을 위한 Zod 스키마
 * @param handlers - 섹션별 데이터 처리 핸들러 맵
 * @param contextName - 에러 로깅을 위한 컨텍스트 이름
 * @returns 정규화된 섹션 배열 또는 null
 */
export function normalizeSectionsFromDB<T extends z.ZodTypeAny>(
  rows: BaseNormalizationInput[],
  schema: T,
  handlers: SectionHandlerMap<T>,
  contextName: string = "section",
): unknown[] | null {
  const sections: unknown[] = [];

  for (const row of rows) {
    if (!row?.data || typeof row.data !== "object") continue;

    // section 정보를 payload에 주입
    const payloadWithSection = {
      ...(row.data as Record<string, unknown>),
      section: row.section,
    };

    // 스키마 검증
    const parsed = schema.safeParse(payloadWithSection);
    if (!parsed.success) {
      console.warn(`Invalid ${contextName} payload`, row.section, parsed.error?.message);
      continue;
    }

    // 섹션별 핸들러 실행
    const handler = handlers[row.section];
    if (handler) {
      const normalizedSection = handler(parsed.data, toHtml);
      if (normalizedSection) {
        sections.push(normalizedSection);
      }
    } else {
      console.warn(`No handler found for ${contextName} section:`, row.section);
    }
  }

  return sections.length === 0 ? null : sections;
}

/**
 * 최종 페이지 컨텐츠 데이터를 생성하는 헬퍼 함수
 * @param sections - 정규화된 섹션 배열
 * @returns 페이지 컨텐츠 데이터 객체
 */
export function createPageContentData<T>(sections: T[]): { sections: T[] } {
  return { sections };
}
