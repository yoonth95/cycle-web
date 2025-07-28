"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

// 경로 세그먼트를 한국어 라벨로 매핑
const pathLabels: Record<string, string> = {
  bicycles: "자전거",
  style: "스타일",
  brand: "브랜드",
  "smart-mobility": "스마트 모빌리티",
  sports: "스포츠",
  lifestyle: "라이프스타일",
  "junior-kids": "주니어, 키즈",
  phantom: "팬텀",
  appalachian: "아팔란치아",
  lespo: "레스포",
  electric: "전기자전거",
  road: "로드",
  hybrid: "하이브리드",
  comfort: "컴포트 산악형",
  fixie: "픽시",
  city: "시티",
  folding: "폴딩",
  junior: "주니어",
  kids: "키즈",
};

const DynamicBreadcrumb = () => {
  const pathname = usePathname();

  // pathname을 세그먼트로 분할
  const segments = pathname.split("/").filter(Boolean);

  // breadcrumb 항목들 생성
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = pathLabels[segment] || segment;
    const isLast = index === segments.length - 1;

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <div className="border-b bg-white py-3">
      <div className="container mx-auto px-4">
        <Breadcrumb className="flex items-center justify-end">
          <BreadcrumbList>
            {/* 홈 링크 */}
            <BreadcrumbItem>
              <Home className="h-4 w-4" />
              <BreadcrumbLink asChild className="hover:text-figma-alizarin-crimson">
                <Link href="/">홈</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* 동적 breadcrumb 항목들 */}
            {breadcrumbItems.map((item) => (
              <React.Fragment key={item.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {item.isLast ? (
                    <BreadcrumbPage className="text-figma-alizarin-crimson">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild className="hover:text-figma-alizarin-crimson">
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default DynamicBreadcrumb;
