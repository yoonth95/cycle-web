"use client";

import { useEffect } from "react";
import { updateDynamicMetadata } from "@/utils/metadata-generator";
import type { BicycleCategoryItemType } from "@/types/bicycle";

interface DynamicMetadataUpdaterProps {
  category: BicycleCategoryItemType;
  baseTitle?: string;
}

/**
 * 클라이언트에서 동적으로 메타데이터를 업데이트하는 컴포넌트
 * 실제 카테고리 데이터가 로드된 후 메타태그를 업데이트합니다.
 */
const DynamicMetadataUpdater = ({
  category,
  baseTitle = "삼천리자전거",
}: DynamicMetadataUpdaterProps) => {
  useEffect(() => {
    // 실제 카테고리 데이터로 메타데이터 업데이트
    const title = `${category.title} | ${baseTitle}`;
    const description = `${category.title} 자전거 모음. 다양한 ${category.title} 자전거를 만나보세요.`;
    const keywords = [
      category.title,
      "자전거",
      baseTitle,
      ...category.subcategories.map((sub) => sub.name),
    ];

    updateDynamicMetadata({
      title,
      description,
      keywords,
    });
  }, [category, baseTitle]);

  // 이 컴포넌트는 메타데이터 업데이트만 담당하므로 렌더링하지 않음
  return null;
};

export default DynamicMetadataUpdater;
