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
import { Home, Bike, Zap, Mountain, Heart, Baby } from "lucide-react";
import SectionHeader from "@/components/common/section-header";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function StylePage() {
  const styleCategories = [
    {
      id: "smart-mobility",
      slug: "smart-mobility",
      title: "스마트 모빌리티",
      description: "친환경적이고 효율적인 미래의 이동수단",
      icon: Zap,
      color: "bg-green-500",
      image: "/bike.png",
      totalCount: 26,
      subcategories: [{ name: "전기자전거", count: 26, slug: "electric" }],
    },
    {
      id: "sports",
      slug: "sports",
      title: "스포츠",
      description: "활동적인 라이프스타일을 위한 고성능 자전거",
      icon: Mountain,
      color: "bg-blue-500",
      image: "/bike.png",
      totalCount: 50,
      subcategories: [
        { name: "로드", count: 15, slug: "road" },
        { name: "하이브리드", count: 20, slug: "hybrid" },
        { name: "컴포트 산악형", count: 15, slug: "comfort" },
      ],
    },
    {
      id: "lifestyle",
      slug: "lifestyle",
      title: "라이프스타일",
      description: "일상을 더욱 특별하게 만드는 감성 자전거",
      icon: Heart,
      color: "bg-pink-500",
      image: "/bike.png",
      totalCount: 40,
      subcategories: [
        { name: "픽시", count: 12, slug: "fixie" },
        { name: "시티", count: 16, slug: "city" },
        { name: "폴딩", count: 12, slug: "folding" },
      ],
    },
    {
      id: "junior-kids",
      slug: "junior-kids",
      title: "주니어, 키즈",
      description: "안전하고 재미있는 어린이 전용 자전거",
      icon: Baby,
      color: "bg-yellow-500",
      image: "/bike.png",
      totalCount: 25,
      subcategories: [
        { name: "주니어", count: 15, slug: "junior" },
        { name: "키즈", count: 10, slug: "kids" },
      ],
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
                <BreadcrumbPage className="text-figma-alizarin-crimson">스타일</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:max-w-[70rem]">
        <SectionHeader
          title="스타일별 자전거"
          description="당신의 라이프스타일에 맞는 자전거를 스타일별로 찾아보세요. 각 카테고리별로 다양한 옵션을 제공합니다."
        />

        {/* Style Categories Grid */}
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
          {styleCategories.map((category) => (
            <Card
              key={category.id}
              className="group overflow-hidden bg-white transition-all hover:shadow-xl"
            >
              <CardContent className="flex h-full flex-col overflow-hidden p-0">
                <AspectRatio ratio={3 / 4} className="relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Category Icon */}
                  <div className="absolute top-6 left-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color}`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Total Count Badge */}
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-white/90 text-gray-900">총 {category.totalCount}개</Badge>
                  </div>

                  {/* Category Title on Image */}
                  <div className="absolute right-6 bottom-6 left-6">
                    <h2 className="mb-2 text-2xl font-bold text-white">{category.title}</h2>
                    <p className="break-keep text-white/90">{category.description}</p>
                  </div>
                </AspectRatio>

                <div className="flex h-full flex-col justify-between p-6">
                  {/* Subcategories */}
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium text-gray-700">하위 카테고리</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {category.subcategories.map((sub, index) => (
                        <Link
                          key={index}
                          href={`/bicycles/style/${category.slug}/${sub.slug}`}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                        >
                          <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {sub.count}개
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href={`/bicycles/style/${category.slug}`}>
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      {category.title} 전체보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
