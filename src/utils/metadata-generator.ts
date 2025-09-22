import type { Metadata } from "next";

interface GenerateMetadataOptions {
  category: string;
  baseTitle?: string;
  baseDescription?: string;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
}

function asAbsoluteUrl(path?: string) {
  if (!path) return undefined;
  try {
    // 이미 절대 URL이면 그대로 반환
    const url = new URL(path);
    return url.toString();
  } catch {
    // 상대경로인 경우 env에 기반해 절대 URL 생성
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    return new URL(path.replace(/^\//, ""), base).toString();
  }
}

/**
 * 자전거 카테고리 페이지의 기본 메타데이터를 생성합니다.
 * 실제 카테고리 정보는 클라이언트에서 동적으로 업데이트됩니다.
 */
export function generateBasicBicycleCategoryMetadata({
  category,
  baseTitle = "삼천리자전거",
}: Omit<GenerateMetadataOptions, "baseDescription">): Metadata {
  // 기본 메타데이터 설정 (데이터 로드 전)
  const title = `${category} | ${baseTitle}`;
  const description = `${category} 자전거 카테고리 페이지입니다.`;

  return {
    title,
    description,
    keywords: [category, "자전거", baseTitle].join(", "),

    // Open Graph 메타데이터
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ko_KR",
    },

    // 구조화된 데이터를 위한 추가 정보
    alternates: {
      canonical: `/bicycles/style/${category}`,
    },

    // 로봇 메타태그
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

/**
 * 일반적인 페이지 메타데이터를 생성합니다.
 * 모든 페이지 타입에서 재사용 가능합니다.
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
}: PageMetadataOptions): Metadata {
  const baseTitle = "삼천리자전거";

  const absoluteImage = asAbsoluteUrl(image);
  const absoluteUrl = url ? asAbsoluteUrl(url) : undefined;

  return {
    title: `${title} | ${baseTitle}`,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : [title, "삼천리자전거"].join(", "),

    // Open Graph 메타데이터
    openGraph: {
      title: `${title} | ${baseTitle}`,
      description,
      type,
      locale: "ko_KR",
      images: absoluteImage ? [{ url: absoluteImage }] : undefined,
      url: absoluteUrl || undefined,
    },

    // Twitter 카드 메타데이터
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${baseTitle}`,
      description,
      images: absoluteImage ? [absoluteImage] : undefined,
    },

    // 구조화된 데이터를 위한 추가 정보
    alternates: absoluteUrl ? { canonical: absoluteUrl } : undefined,

    // 로봇 메타태그
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

/**
 * 동적 메타데이터 업데이트를 위한 유틸리티 함수
 * 클라이언트에서 실제 카테고리 데이터가 로드된 후 메타태그를 업데이트합니다.
 */
export function updateDynamicMetadata({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string[];
}) {
  // 제목 업데이트
  if (typeof document !== "undefined") {
    document.title = title;

    // 메타 태그 업데이트
    const updateMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    // 기본 메타태그 업데이트
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords.join(", "));

    // Open Graph 태그 업데이트
    updatePropertyTag("og:title", title);
    updatePropertyTag("og:description", description);
  }
}
