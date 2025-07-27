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
    subcategory: string;
  };
}

export default function StyleSubcategoryPage({ params }: PageProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([params.category]);

  // Category data mapping
  const categoryData: Record<string, any> = {
    "smart-mobility": {
      title: "스마트 모빌리티",
      description: "친환경적이고 효율적인 미래의 이동수단",
      subcategories: {
        electric: { name: "전기자전거", description: "친환경 전기 자전거로 편리한 이동" },
      },
    },
    sports: {
      title: "스포츠",
      description: "활동적인 라이프스타일을 위한 고성능 자전거",
      subcategories: {
        road: { name: "로드", description: "빠른 속도와 효율적인 페달링을 위한 로드바이크" },
        hybrid: { name: "하이브리드", description: "도심과 야외 모두에서 활용 가능한 만능 자전거" },
        comfort: { name: "컴포트 산악형", description: "편안한 승차감의 산악 자전거" },
      },
    },
    lifestyle: {
      title: "라이프스타일",
      description: "일상을 더욱 특별하게 만드는 감성 자전거",
      subcategories: {
        fixie: { name: "픽시", description: "심플하고 세련된 고정기어 자전거" },
        city: { name: "시티", description: "도시에서의 편리한 일상 이동수단" },
        folding: { name: "폴딩", description: "접어서 보관하기 편리한 폴딩 자전거" },
      },
    },
    "junior-kids": {
      title: "주니어, 키즈",
      description: "안전하고 재미있는 어린이 전용 자전거",
      subcategories: {
        junior: { name: "주니어", description: "성장하는 아이들을 위한 주니어 자전거" },
        kids: { name: "키즈", description: "어린이의 안전을 최우선으로 하는 키즈 자전거" },
      },
    },
  };

  const currentCategory = categoryData[params.category];
  const currentSubcategory = currentCategory?.subcategories[params.subcategory];

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
  };

  // Sample bicycle data - in real app, this would be filtered by category and subcategory
  const bicycles = [
    {
      id: 1,
      name: "팬텀 FS PRO",
      price: "2,299,000원",
      image: "/bike.png",
      tags: ["27.5", "NEW"],
      category: currentCategory?.title || "자전거",
      subcategory: currentSubcategory?.name || "",
      specs: ["배터리: 48V 21Ah", "주행거리: 최대 100km", "무게: 24kg", "모터: 250W"],
      features: ["LED 조명 내장", "USB 충전 포트", "스마트 디스플레이"],
    },
    {
      id: 2,
      name: "팬텀 HX PLUS",
      price: "1,599,000원",
      image: "/bike.png",
      tags: ["26", "POPULAR"],
      category: currentCategory?.title || "자전거",
      subcategory: currentSubcategory?.name || "",
      specs: ["배터리: 36V 15Ah", "주행거리: 최대 70km", "무게: 22kg", "모터: 250W"],
      features: ["접이식 페달", "후방 반사경", "안전 벨 포함"],
    },
    {
      id: 3,
      name: "스마트 시티 DELUXE",
      price: "1,199,000원",
      image: "/bike.png",
      tags: ["24", "SALE"],
      category: currentCategory?.title || "자전거",
      subcategory: currentSubcategory?.name || "",
      specs: ["배터리: 36V 12Ah", "주행거리: 최대 60km", "무게: 20kg", "모터: 200W"],
      features: ["바구니 포함", "후미등 자동", "3단 변속"],
    },
    {
      id: 4,
      name: "어반 라이더",
      price: "899,000원",
      image: "/bike.png",
      tags: ["22"],
      category: currentCategory?.title || "자전거",
      subcategory: currentSubcategory?.name || "",
      specs: ["배터리: 24V 8Ah", "주행거리: 최대 40km", "무게: 18kg", "모터: 180W"],
      features: ["컴팩트 디자인", "퀵 차징", "앱 연동"],
    },
  ];

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Navigation Back to Parent */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <Link
          href={`/bicycles/style/${params.category}`}
          className="flex items-center text-sm text-gray-600 hover:text-red-600"
        >
          ← {currentCategory?.title} 전체보기
        </Link>
      </div>

      {/* Current Category & Subcategory */}
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
                  {Object.entries(currentCategory.subcategories).map(
                    ([key, sub]: [string, any]) => (
                      <Link
                        key={key}
                        href={`/bicycles/style/${params.category}/${key}`}
                        className={`flex w-full items-center justify-between rounded-md p-2 text-sm transition-colors ${
                          params.subcategory === key
                            ? "border-l-2 border-red-500 bg-red-50 text-red-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span>{sub.name}</span>
                      </Link>
                    ),
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      )}

      {/* Filter Options */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-bold text-gray-900">필터</h3>
        </div>
        <div className="space-y-4 p-4">
          {/* Price Range */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">가격대</h4>
            <div className="space-y-2">
              {["50만원 미만", "50-100만원", "100-150만원", "150-200만원", "200만원 이상"].map(
                (price, index) => (
                  <label key={index} className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2 rounded" />
                    {price}
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Battery */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">배터리 용량</h4>
            <div className="space-y-2">
              {["10Ah 미만", "10-15Ah", "15-20Ah", "20Ah 이상"].map((battery, index) => (
                <label key={index} className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2 rounded" />
                  {battery}
                </label>
              ))}
            </div>
          </div>
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

  if (!currentCategory || !currentSubcategory) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h1>
          <p className="mt-2 text-gray-600">존재하지 않는 카테고리 또는 서브카테고리입니다.</p>
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
                <BreadcrumbLink asChild className="hover:text-figma-alizarin-crimson">
                  <Link href={`/bicycles/style/${params.category}`}>{currentCategory.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-figma-alizarin-crimson">
                  {currentSubcategory.name}
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
                  <h2 className="text-lg font-bold">필터</h2>
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
              <div className="mb-2 flex items-center text-sm text-gray-500">
                <span>{currentCategory.title}</span>
                <span className="mx-2">›</span>
                <span className="font-medium text-red-600">{currentSubcategory.name}</span>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                {currentSubcategory.name}
              </h1>
              <p className="text-gray-600">{currentSubcategory.description}</p>
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
                <option>평점순</option>
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
                          <Badge
                            key={index}
                            className={`mr-2 text-white ${
                              tag === "NEW"
                                ? "bg-green-600"
                                : tag === "POPULAR"
                                  ? "bg-blue-600"
                                  : tag === "SALE"
                                    ? "bg-orange-600"
                                    : "bg-red-600"
                            }`}
                          >
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

                      {/* Features */}
                      <div className="mb-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">특징</h4>
                        <div className="flex flex-wrap gap-1">
                          {bike.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {bike.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bike.subcategory}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-red-500 hover:bg-red-600">자세히 보기</Button>
                        <Button variant="outline" className="px-3">
                          ♡
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="px-8">
                더 많은 제품 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
