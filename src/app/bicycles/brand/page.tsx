import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home, Bike, Award, Star, Trophy } from "lucide-react";

export default function BrandPage() {
  const brands = [
    {
      id: "phantom",
      name: "팬텀",
      slug: "phantom",
      description: "전기자전거의 선두주자, 혁신적인 기술과 디자인",
      image: "/bike.png",
      logo: "/logo-red.png",
      productCount: 48,
      specialties: ["전기자전거", "MTB 전기자전거", "시티 전기자전거"],
      features: ["고용량 배터리", "스마트 디스플레이", "친환경 소재"],
      popularModels: ["팬텀 FS", "팬텀 HX", "팬텀 CITY"],
      priceRange: "89만원 ~ 299만원",
      rating: 4.8,
      isPopular: true,
    },
    {
      id: "appalachian",
      name: "아팔란치아",
      slug: "appalachian",
      description: "산악자전거 전문 브랜드, 극한의 성능과 내구성",
      image: "/bike.png",
      logo: "/logo-red.png",
      productCount: 32,
      specialties: ["산악자전거", "로드바이크", "하이브리드"],
      features: ["경량 카본 프레임", "고급 서스펜션", "정밀 변속 시스템"],
      popularModels: ["아팔란치아 XC", "아팔란치아 로드", "아팔란치아 하이브리드"],
      priceRange: "119만원 ~ 449만원",
      rating: 4.7,
      isPopular: false,
    },
    {
      id: "lespo",
      name: "레스포",
      slug: "lespo",
      description: "라이프스타일 자전거의 대표, 감성과 실용성의 조화",
      image: "/bike.png",
      logo: "/logo-red.png",
      productCount: 31,
      specialties: ["시티바이크", "폴딩바이크", "픽시바이크"],
      features: ["세련된 디자인", "편안한 승차감", "도시형 최적화"],
      popularModels: ["레스포 시티", "레스포 폴딩", "레스포 픽시"],
      priceRange: "39만원 ~ 159만원",
      rating: 4.6,
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white py-3">
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
                <BreadcrumbPage className="text-figma-alizarin-crimson">브랜드</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Award className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">브랜드별 자전거</h1>
          <p className="mx-auto text-lg text-gray-600">
            신뢰할 수 있는 브랜드의 자전거를 만나보세요. 각 브랜드만의 특별한 기술과 디자인을
            경험하실 수 있습니다.
          </p>
        </div>

        {/* Brand Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 text-center">
            <div className="mb-2 text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">프리미엄 브랜드</div>
          </div>
          <div className="rounded-lg bg-white p-6 text-center">
            <div className="mb-2 text-2xl font-bold text-red-600">111</div>
            <div className="text-sm text-gray-600">총 제품 수</div>
          </div>
          <div className="rounded-lg bg-white p-6 text-center">
            <div className="mb-2 text-2xl font-bold text-red-600">4.7</div>
            <div className="text-sm text-gray-600">평균 평점</div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-1">
          {brands.map((brand) => (
            <Card
              key={brand.id}
              className="group overflow-hidden bg-white transition-all hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="relative lg:w-1/2">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={600}
                      height={400}
                      className="h-64 w-full object-cover transition-transform group-hover:scale-105 lg:h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />

                    {/* Brand Logo */}
                    <div className="absolute top-6 left-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} 로고`}
                          width={40}
                          height={40}
                          className="h-8 w-8"
                        />
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-6 right-6 space-y-2">
                      {brand.isPopular && (
                        <Badge className="bg-orange-500 text-white">
                          <Star className="mr-1 h-3 w-3" />
                          인기
                        </Badge>
                      )}
                      <Badge className="bg-white/90 text-gray-900">
                        {brand.productCount}개 제품
                      </Badge>
                    </div>

                    {/* Rating on Image */}
                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center rounded-lg bg-white/90 px-3 py-2">
                        <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-gray-900">{brand.rating}</span>
                        <span className="ml-1 text-sm text-gray-600">/5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8">
                    <div className="mb-4">
                      <h2 className="mb-2 text-3xl font-bold text-gray-900">{brand.name}</h2>
                      <p className="text-gray-600">{brand.description}</p>
                    </div>

                    {/* Price Range */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">가격대</div>
                      <div className="text-lg font-bold text-gray-900">{brand.priceRange}</div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h3 className="mb-2 text-sm font-medium text-gray-700">전문 분야</h3>
                      <div className="flex flex-wrap gap-2">
                        {brand.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h3 className="mb-2 text-sm font-medium text-gray-700">주요 특징</h3>
                      <div className="space-y-1">
                        {brand.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className="mr-2 h-1 w-1 rounded-full bg-red-400"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular Models */}
                    <div className="mb-6">
                      <h3 className="mb-2 text-sm font-medium text-gray-700">인기 모델</h3>
                      <div className="text-sm text-gray-600">{brand.popularModels.join(", ")}</div>
                    </div>

                    <Link href={`/bicycles/brand/${brand.slug}`}>
                      <Button className="w-full bg-red-500 hover:bg-red-600">
                        {brand.name} 제품 보기
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16">
          <div className="rounded-lg bg-white p-8">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">브랜드별 전문 상담</h2>
              <p className="mb-6 text-gray-600">
                각 브랜드의 전문가가 고객님께 맞는 자전거를 추천해드립니다.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button className="bg-red-500 hover:bg-red-600">📞 전화 상담 (1588-1234)</Button>
                <Button variant="outline">💬 온라인 상담</Button>
                <Button variant="outline">📍 매장 방문 예약</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
