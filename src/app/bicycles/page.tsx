import Image from "next/image";
import Link from "next/link";
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
import { Home, Bike, Palette, Award } from "lucide-react";

export default function BicyclesPage() {
  const categories = [
    {
      id: "style",
      title: "스타일별",
      description: "라이프스타일에 맞는 자전거를 찾아보세요",
      icon: Palette,
      link: "/bicycles/style",
      image: "/main-image.png",
      items: [
        { name: "스마트 모빌리티", count: 26 },
        { name: "스포츠", count: 50 },
        { name: "라이프스타일", count: 40 },
        { name: "주니어, 키즈", count: 25 },
      ],
    },
    {
      id: "brand",
      title: "브랜드별",
      description: "신뢰할 수 있는 브랜드의 자전거를 만나보세요",
      icon: Award,
      link: "/bicycles/brand",
      image: "/bike.png",
      items: [
        { name: "팬텀", count: 48 },
        { name: "아팔란치아", count: 32 },
        { name: "레스포", count: 31 },
      ],
    },
  ];

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
                <BreadcrumbPage className="text-figma-alizarin-crimson">자전거</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Bike className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">자전거</h1>
          <p className="mx-auto text-lg text-gray-600">
            당신의 라이프스타일에 맞는 완벽한 자전거를 찾아보세요. 스타일별 또는 브랜드별로 다양한
            자전거를 만나볼 수 있습니다.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-8 lg:grid-cols-2">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={600}
                    height={300}
                    className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
                  <div className="absolute top-6 left-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                      <category.icon className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">{category.title}</h2>
                  <p className="mb-4 text-gray-600">{category.description}</p>

                  {/* Category Items */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                      >
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.count}개</span>
                      </div>
                    ))}
                  </div>

                  <Link href={category.link}>
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      {category.title} 보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-lg bg-gray-900 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">자전거 상담이 필요하신가요?</h2>
          <p className="mb-6 text-gray-300">전문 상담원이 고객님께 맞는 자전거를 추천해드립니다.</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button className="bg-red-500 hover:bg-red-600">📞 1588-1234</Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              📧 온라인 상담
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
