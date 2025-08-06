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
import { getBicycleById, generatePathLabels } from "@/utils/bicycle-data";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();

  // 동적으로 path 라벨 생성
  const pathLabels = generatePathLabels();

  // pathname을 세그먼트로 분할
  const segments = pathname.split("/").filter(Boolean);

  // breadcrumb 항목들 생성
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    let label = pathLabels[segment] || segment;
    const isLast = index === segments.length - 1;

    // 마지막 세그먼트가 숫자(자전거 ID)인 경우 자전거 이름으로 변경
    if (isLast && !isNaN(Number(segment))) {
      const bicycleId = Number(segment);
      const bicycle = getBicycleById(bicycleId);
      if (bicycle) {
        label = bicycle.name;
      }
    }

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
