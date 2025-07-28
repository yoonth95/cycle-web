"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Menu, Home, Bike, Star, Trophy, Award, Zap, Battery, Gauge } from "lucide-react";

interface PageProps {
  params: {
    category: string;
  };
}

export default function BrandCategoryPage({ params }: PageProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Brand data mapping
  const brandData: Record<string, any> = {
    phantom: {
      name: "팬텀",
      description:
        "전기자전거의 선두주자, 혁신적인 기술과 디자인으로 미래의 이동수단을 제시합니다.",
      logo: "/logo-red.png",
      rating: 4.8,
      establishedYear: 2018,
      specialties: ["전기자전거", "MTB 전기자전거", "시티 전기자전거"],
      features: [
        "고용량 배터리 시스템",
        "스마트 LCD 디스플레이",
        "친환경 알루미늄 프레임",
        "통합 LED 조명",
        "USB 충전 포트",
      ],
      awards: ["2023 전기자전거 대상", "친환경 제품 인증", "디자인 어워드"],
      warranty: "2년 품질보증",
      totalProducts: 48,
    },
    appalachian: {
      name: "아팔란치아",
      description:
        "산악자전거 전문 브랜드로 극한의 성능과 내구성을 자랑하는 프리미엄 자전거를 제공합니다.",
      logo: "/logo-red.png",
      rating: 4.7,
      establishedYear: 2015,
      specialties: ["산악자전거", "로드바이크", "하이브리드"],
      features: [
        "경량 카본 파이버 프레임",
        "고급 시마노 변속기",
        "프리미엄 서스펜션",
        "정밀 브레이크 시스템",
        "방수 처리",
      ],
      awards: ["MTB 챔피언십 공식 브랜드", "산악자전거 품질 대상", "내구성 테스트 1위"],
      warranty: "3년 품질보증",
      totalProducts: 32,
    },
    lespo: {
      name: "레스포",
      description:
        "라이프스타일 자전거의 대표 브랜드로 감성과 실용성이 조화된 도시형 자전거를 선보입니다.",
      logo: "/logo-red.png",
      rating: 4.6,
      establishedYear: 2020,
      specialties: ["시티바이크", "폴딩바이크", "픽시바이크"],
      features: [
        "세련된 미니멀 디자인",
        "편안한 에르고 시트",
        "도시형 최적화 기어",
        "경량 알루미늄 소재",
        "접이식 편의 기능",
      ],
      awards: ["라이프스타일 브랜드 상", "도시 이동성 혁신상", "디자인 우수상"],
      warranty: "1년 품질보증",
      totalProducts: 31,
    },
  };

  const currentBrand = brandData[params.category];

  // Sample bicycle data - in real app, this would be filtered by brand
  const bicycles = [
    {
      id: 1,
      name: `${currentBrand?.name} FS PRO`,
      price: "2,299,000원",
      originalPrice: "2,599,000원",
      image: "/bike.png",
      tags: ["27.5", "NEW", "BEST"],
      brand: currentBrand?.name || "브랜드",
      specs: ["배터리: 48V 21Ah", "주행거리: 최대 100km", "무게: 24kg", "모터: 250W"],
      features: ["LED 조명 내장", "USB 충전 포트", "스마트 디스플레이", "APP 연동"],
      discount: 12,
      reviews: 127,
      rating: 4.9,
    },
    {
      id: 2,
      name: `${currentBrand?.name} HX PLUS`,
      price: "1,599,000원",
      originalPrice: "1,799,000원",
      image: "/bike.png",
      tags: ["26", "POPULAR"],
      brand: currentBrand?.name || "브랜드",
      specs: ["배터리: 36V 15Ah", "주행거리: 최대 70km", "무게: 22kg", "모터: 250W"],
      features: ["접이식 페달", "후방 반사경", "안전 벨 포함", "방수 처리"],
      discount: 11,
      reviews: 89,
      rating: 4.7,
    },
    {
      id: 3,
      name: `${currentBrand?.name} CITY DELUXE`,
      price: "1,199,000원",
      originalPrice: "1,299,000원",
      image: "/bike.png",
      tags: ["24", "SALE"],
      brand: currentBrand?.name || "브랜드",
      specs: ["배터리: 36V 12Ah", "주행거리: 최대 60km", "무게: 20kg", "모터: 200W"],
      features: ["바구니 포함", "후미등 자동", "3단 변속", "편안한 시트"],
      discount: 8,
      reviews: 64,
      rating: 4.5,
    },
  ];

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Brand Info */}
      {currentBrand && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center">
            <Image
              src={currentBrand.logo}
              alt={`${currentBrand.name} 로고`}
              width={40}
              height={40}
              className="mr-3 h-10 w-10"
            />
            <div>
              <h3 className="font-bold text-gray-900">{currentBrand.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Trophy className="mr-1 h-3 w-3 text-yellow-500" />
                {currentBrand.rating}/5.0
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">설립연도:</span>
              <span className="font-medium">{currentBrand.establishedYear}년</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">총 제품:</span>
              <span className="font-medium">{currentBrand.totalProducts}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">보증기간:</span>
              <span className="font-medium">{currentBrand.warranty}</span>
            </div>
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
              {["100만원 미만", "100-150만원", "150-200만원", "200-250만원", "250만원 이상"].map(
                (price, index) => (
                  <label key={index} className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2 rounded" />
                    {price}
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">주요 기능</h4>
            <div className="space-y-2">
              {["LED 조명", "USB 충전", "앱 연동", "접이식", "방수"].map((feature, index) => (
                <label key={index} className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2 rounded" />
                  {feature}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Other Brands Quick Links */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 font-bold text-gray-900">브랜드별 카테고리</h3>
        <div className="space-y-2">
          {Object.entries(brandData).map(([key, value]) => {
            const isActive = key === params.category;

            return (
              <div key={key}>
                {isActive ? (
                  // 현재 활성화된 브랜드
                  <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 shadow-sm">
                    <div className="flex-1">
                      <span className="font-medium text-red-700">{value.name}</span>
                      <p className="mt-1 text-xs text-red-600">
                        {value.description.slice(0, 30)}...
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-xs text-red-700">
                      현재
                    </Badge>
                  </div>
                ) : (
                  // 다른 브랜드 (링크)
                  <Link href={`/bicycles/brand/${key}`} className="block">
                    <div className="rounded-md p-3 text-sm text-gray-600 transition-colors hover:bg-white hover:text-red-600 hover:shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{value.name}</div>
                          <div className="mt-1 text-xs text-gray-600">
                            {value.description.slice(0, 30)}...
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {value.totalProducts}개
                        </Badge>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-lg bg-gray-900 p-4 text-white">
        <h3 className="mb-3 font-bold">브랜드 전문 상담</h3>
        <div className="space-y-2 text-sm">
          <div>📞 1588-1234</div>
          <div>🕒 평일 09:00-18:00</div>
          <div>📧 brand@samchuly.co.kr</div>
        </div>
        <Button className="mt-4 w-full bg-red-500 hover:bg-red-600">
          {currentBrand?.name} 상담
        </Button>
      </div>
    </div>
  );

  if (!currentBrand) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">브랜드를 찾을 수 없습니다</h1>
          <p className="mt-2 text-gray-600">존재하지 않는 브랜드입니다.</p>
          <Link href="/bicycles/brand">
            <Button className="mt-4 bg-red-500 hover:bg-red-600">브랜드 페이지로 돌아가기</Button>
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
                  <Link href="/bicycles/brand">브랜드</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-figma-alizarin-crimson">
                  {currentBrand.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Brand Hero Section */}
      <div className="border-b bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center text-center lg:flex-row lg:text-left">
            <div className="mb-6 lg:mr-8 lg:mb-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
                <Image
                  src={currentBrand.logo}
                  alt={`${currentBrand.name} 로고`}
                  width={50}
                  height={50}
                  className="h-12 w-12"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{currentBrand.name}</h1>
              <p className="mb-4 text-gray-300 lg:text-lg">{currentBrand.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
                  <span className="font-bold">{currentBrand.rating}/5.0</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-blue-400" />
                  <span>{currentBrand.establishedYear}년 설립</span>
                </div>
                <div className="flex items-center">
                  <Bike className="mr-2 h-5 w-5 text-green-400" />
                  <span>{currentBrand.totalProducts}개 제품</span>
                </div>
              </div>
            </div>
          </div>
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
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between rounded-lg border bg-white p-4">
              <div className="text-sm text-gray-600">
                총 <span className="font-medium text-gray-900">{bicycles.length}개</span>의{" "}
                {currentBrand.name} 제품이 있습니다
              </div>
              <select className="rounded border border-gray-300 px-3 py-1 text-sm">
                <option>추천순</option>
                <option>최신순</option>
                <option>가격 낮은순</option>
                <option>가격 높은순</option>
                <option>평점순</option>
                <option>리뷰 많은순</option>
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
                                    : tag === "BEST"
                                      ? "bg-purple-600"
                                      : "bg-red-600"
                            }`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {bike.discount > 0 && (
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                            -{bike.discount}%
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-red-600 lg:text-xl">
                        {bike.name}
                      </h3>

                      {/* Price & Rating */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-gray-900 lg:text-2xl">
                            {bike.price}
                          </p>
                          {bike.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {bike.originalPrice}
                            </p>
                          )}
                        </div>
                        <div className="mt-1 flex items-center">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{bike.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({bike.reviews})</span>
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="mb-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">주요 사양</h4>
                        {bike.specs.slice(0, 3).map((spec, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className="mr-2 h-1 w-1 rounded-full bg-gray-400"></div>
                            {spec}
                          </div>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {bike.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-red-500 hover:bg-red-600">자세히 보기</Button>
                        <Button variant="outline" className="px-3">
                          ♡
                        </Button>
                        <Button variant="outline" className="px-3">
                          📋
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
                더 많은 {currentBrand.name} 제품 보기
              </Button>
            </div>

            {/* Brand Features Section */}
            <div className="mt-16 rounded-lg bg-white p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {currentBrand.name}의 특별함
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900">주요 특징</h3>
                  <div className="space-y-2">
                    {currentBrand.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="mr-2 h-1 w-1 rounded-full bg-red-400"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900">수상 경력</h3>
                  <div className="space-y-2">
                    {currentBrand.awards.map((award: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Trophy className="mr-2 h-3 w-3 text-yellow-500" />
                        {award}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
