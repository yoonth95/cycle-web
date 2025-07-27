"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Menu, ChevronDown, Home, Bike } from "lucide-react";

interface PageProps {
  params: {
    category: string;
  };
}

export default function StyleCategoryPage({ params }: PageProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([params.category]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Category data mapping
  const categoryData: Record<string, any> = {
    "smart-mobility": {
      title: "스마트 모빌리티",
      description: "친환경적이고 효율적인 미래의 이동수단",
      subcategories: [{ id: "electric", name: "전기자전거", count: 26, isDefault: true }],
    },
    sports: {
      title: "스포츠",
      description: "활동적인 라이프스타일을 위한 고성능 자전거",
      subcategories: [
        { id: "road", name: "로드", count: 15 },
        { id: "hybrid", name: "하이브리드", count: 20, isDefault: true },
        { id: "comfort", name: "컴포트 산악형", count: 15 },
      ],
    },
    lifestyle: {
      title: "라이프스타일",
      description: "일상을 더욱 특별하게 만드는 감성 자전거",
      subcategories: [
        { id: "fixie", name: "픽시", count: 12 },
        { id: "city", name: "시티", count: 16, isDefault: true },
        { id: "folding", name: "폴딩", count: 12 },
      ],
    },
    "junior-kids": {
      title: "주니어, 키즈",
      description: "안전하고 재미있는 어린이 전용 자전거",
      subcategories: [
        { id: "junior", name: "주니어", count: 15, isDefault: true },
        { id: "kids", name: "키즈", count: 10 },
      ],
    },
  };

  const currentCategory = categoryData[params.category];
  const defaultSubcategory =
    currentCategory?.subcategories.find((sub: any) => sub.isDefault)?.id ||
    currentCategory?.subcategories[0]?.id ||
    "";

  // Set default selected subcategory on load
  useState(() => {
    setSelectedSubcategory(defaultSubcategory);
  });

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
  };

  // Sample bicycle data - in real app, this would be filtered by category
  const bicycles = [
    {
      id: 1,
      name: "팬텀 FS",
      price: "1,999,000원",
      image: "/bike.png",
      tags: ["27.5"],
      category: currentCategory?.title || "자전거",
      subcategory: selectedSubcategory,
      specs: ["배터리: 48V 17.5Ah", "주행거리: 최대 80km", "무게: 24kg"],
    },
    {
      id: 2,
      name: "팬텀 HX",
      price: "1,332,000원",
      image: "/bike.png",
      tags: ["26"],
      category: currentCategory?.title || "자전거",
      subcategory: selectedSubcategory,
      specs: ["배터리: 36V 10.4Ah", "주행거리: 최대 50km", "무게: 22kg"],
    },
    {
      id: 3,
      name: "스마트 시티",
      price: "899,000원",
      image: "/bike.png",
      tags: ["24"],
      category: currentCategory?.title || "자전거",
      subcategory: selectedSubcategory,
      specs: ["배터리: 36V 8.8Ah", "주행거리: 최대 40km", "무게: 20kg"],
    },
  ];

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Current Category */}
      {currentCategory && (
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="flex items-center font-bold text-gray-900">
              <Bike className="mr-2 h-5 w-5 text-red-500" />
              {currentCategory.title}
            </h3>
          </div>

          <div className="p-2">
            <Collapsible
              open={openCategories.includes(params.category)}
              onOpenChange={() => toggleCategory(params.category)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-3 text-left transition-colors hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{currentCategory.title}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    openCategories.includes(params.category) ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-1 ml-3">
                <div className="space-y-1">
                  {currentCategory.subcategories.map((sub: any) => (
                    <Link
                      key={sub.id}
                      href={`/bicycles/style/${params.category}/${sub.id}`}
                      className={`flex w-full items-center justify-between rounded-md p-2 text-sm transition-colors ${
                        selectedSubcategory === sub.id
                          ? "border-l-2 border-red-500 bg-red-50 text-red-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span>{sub.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {sub.count}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      )}

      {/* Other Categories Quick Links */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 font-bold text-gray-900">다른 스타일</h3>
        <div className="space-y-2">
          {Object.entries(categoryData)
            .filter(([key]) => key !== params.category)
            .map(([key, value]) => (
              <Link
                key={key}
                href={`/bicycles/style/${key}`}
                className="block rounded-md p-2 text-sm text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
              >
                {value.title}
              </Link>
            ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-lg bg-gray-900 p-4 text-white">
        <h3 className="mb-3 font-bold">고객 상담센터</h3>
        <div className="space-y-2 text-sm">
          <div>📞 1588-1234</div>
          <div>🕒 평일 09:00-18:00</div>
          <div>📧 help@samchuly.co.kr</div>
        </div>
        <Button className="mt-4 w-full bg-red-500 hover:bg-red-600">상담 신청</Button>
      </div>
    </div>
  );

  if (!currentCategory) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">카테고리를 찾을 수 없습니다</h1>
          <p className="mt-2 text-gray-600">존재하지 않는 카테고리입니다.</p>
          <Link href="/bicycles/style">
            <Button className="mt-4 bg-red-500 hover:bg-red-600">스타일 페이지로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Breadcrumb */}
      <div className="border-b py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb className="flex items-center justify-end">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Home className="h-4 w-4" />
                <BreadcrumbLink asChild className="hover:text-figma-alizarin-crimson">
                  <Link href="/">홈</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-figma-alizarin-crimson">
                  <Link href="/bicycles">자전거</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-figma-alizarin-crimson">
                  <Link href="/bicycles/style">스타일</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-figma-alizarin-crimson">
                  {currentCategory.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <div className="fixed right-6 bottom-6 z-50 lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="rounded-full bg-red-600 p-3 text-white shadow-lg transition-colors hover:bg-red-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Filter Overlay */}
          {isMobileFilterOpen && (
            <div className="bg-opacity-50 fixed inset-0 z-50 bg-black lg:hidden">
              <div className="absolute top-0 right-0 h-full w-80 overflow-y-auto bg-gray-50 shadow-xl">
                <div className="flex items-center justify-between border-b bg-white p-4">
                  <h2 className="text-lg font-bold">카테고리</h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="rounded p-2 hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <SidebarContent />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden w-80 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <SidebarContent />
            </div>
          </div>

          {/* Main content */}
          <div className="w-full flex-1 lg:w-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                {currentCategory.title}
              </h1>
              <p className="text-gray-600">{currentCategory.description}</p>
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between rounded-lg border bg-white p-4">
              <div className="text-sm text-gray-600">
                총 <span className="font-medium text-gray-900">{bicycles.length}개</span>의 제품이
                있습니다
              </div>
              <select className="rounded border border-gray-300 px-3 py-1 text-sm">
                <option>최신순</option>
                <option>가격 낮은순</option>
                <option>가격 높은순</option>
                <option>인기순</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {bicycles.map((bike) => (
                <Card key={bike.id} className="group bg-white transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={bike.image}
                        alt={bike.name}
                        width={400}
                        height={300}
                        className="h-64 w-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        {bike.tags.map((tag, index) => (
                          <Badge key={index} className="mr-2 bg-red-600 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-red-600 lg:text-xl">
                        {bike.name}
                      </h3>
                      <p className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                        {bike.price}
                      </p>

                      {/* Specifications */}
                      <div className="mb-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">주요 사양</h4>
                        {bike.specs.map((spec, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className="mr-2 h-1 w-1 rounded-full bg-gray-400"></div>
                            {spec}
                          </div>
                        ))}
                      </div>

                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {bike.category}
                        </Badge>
                      </div>

                      <Button className="w-full bg-red-500 hover:bg-red-600">자세히 보기</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
