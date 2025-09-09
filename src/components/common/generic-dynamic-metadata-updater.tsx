"use client";

import { useEffect } from "react";
import { updateDynamicMetadata } from "@/utils/metadata-generator";
import type { BicycleTag } from "@/types/bicycle";

/**
 * 메타데이터 생성을 위한 공통 데이터 인터페이스
 */
export interface MetadataData {
  /** 제목 (name, title 등) */
  title?: string;
  name?: string;
  /** 설명 (description, content 등) */
  description?: string | { ops: Record<string, unknown>[] };
  content?: string | { ops: Record<string, unknown>[] };
  /** 카테고리 정보 */
  category?: string;
  /** 태그 정보 */
  tags?: BicycleTag[] | string[];
  /** 서브카테고리 정보 */
  subcategories?: Array<{ name: string } | string>;
  /** 슬러그 */
  slug?: string;
  /** ID */
  id?: string;
}

/**
 * 메타데이터 생성 옵션 인터페이스
 */
export interface MetadataOptions<T extends MetadataData = MetadataData> {
  /** 기본 타이틀 (예: "삼천리자전거") */
  baseTitle?: string;
  /** 커스텀 타이틀 포맷터 */
  titleFormatter?: (data: T, baseTitle?: string) => string;
  /** 커스텀 설명 포맷터 */
  descriptionFormatter?: (data: T) => string;
  /** 커스텀 키워드 포맷터 */
  keywordsFormatter?: (data: T, additionalKeywords?: string[]) => string[];
  /** 추가 키워드들 */
  additionalKeywords?: string[];
}

/**
 * 범용 메타데이터 업데이트 컴포넌트 Props
 */
export interface GenericDynamicMetadataUpdaterProps<T extends MetadataData = MetadataData> {
  /** 메타데이터를 생성할 데이터 */
  data: T;
  /** 메타데이터 생성 옵션 */
  options?: MetadataOptions<T>;
}

/**
 * 기본 메타데이터 포맷터들
 */
const defaultFormatters = {
  /** 기본 타이틀 포맷터 - 데이터의 title 속성을 사용 */
  title: (data: MetadataData, baseTitle = "삼천리자전거") => {
    const title = data.title || data.name || "페이지";
    return `${title} | ${baseTitle}`;
  },

  /** 기본 설명 포맷터 - 데이터의 description 또는 content를 사용 */
  description: (data: MetadataData) => {
    // content가 string인 경우 HTML 태그 제거
    if (data.content && typeof data.content === "string") {
      return data.content.replace(/<[^>]*>/g, "").substring(0, 160) + "...";
    }
    // description이 있는 경우 사용
    if (data.description && typeof data.description === "string") {
      return data.description.replace(/<[^>]*>/g, "").substring(0, 160) + "...";
    }
    // 기본 설명
    return "삼천리자전거의 다양한 제품과 서비스를 만나보세요.";
  },

  /** 기본 키워드 포맷터 */
  keywords: (data: MetadataData, additionalKeywords: string[] = []) => {
    const baseKeywords = ["삼천리자전거"];

    // 데이터에서 키워드 추출
    if (data.title) baseKeywords.push(data.title);
    if (data.name) baseKeywords.push(data.name);
    if (data.category) baseKeywords.push(data.category);
    if (data.tags && Array.isArray(data.tags)) {
      baseKeywords.push(
        ...data.tags.map((tag) =>
          typeof tag === "string" ? tag : "label" in tag ? tag.label : String(tag),
        ),
      );
    }
    if (data.subcategories && Array.isArray(data.subcategories)) {
      baseKeywords.push(
        ...data.subcategories.map((sub) =>
          typeof sub === "string" ? sub : "name" in sub ? sub.name : String(sub),
        ),
      );
    }

    return [...baseKeywords, ...additionalKeywords];
  },
};

/**
 * 클라이언트에서 동적으로 메타데이터를 업데이트하는 범용 컴포넌트
 * 자전거, 공지사항 등 다양한 데이터 타입을 지원합니다.
 */
const GenericDynamicMetadataUpdater = <T extends MetadataData = MetadataData>({
  data,
  options = {},
}: GenericDynamicMetadataUpdaterProps<T>) => {
  useEffect(() => {
    const {
      baseTitle = "삼천리자전거",
      titleFormatter = defaultFormatters.title,
      descriptionFormatter = defaultFormatters.description,
      keywordsFormatter = defaultFormatters.keywords,
      additionalKeywords = [],
    } = options;

    // 메타데이터 생성
    const title = titleFormatter(data, baseTitle);
    const description = descriptionFormatter(data);
    const keywords = keywordsFormatter(data, additionalKeywords || []);

    // 메타데이터 업데이트
    updateDynamicMetadata({
      title,
      description,
      keywords,
    });
  }, [data, options]);

  return null;
};

export default GenericDynamicMetadataUpdater;
