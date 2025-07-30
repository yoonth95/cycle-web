import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/section-header";
import { Palette, Award } from "lucide-react";

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
        { name: "전기자전거", count: 26 },
        { name: "스포츠", count: 50 },
        { name: "라이프스타일", count: 40 },
        { name: "주니어, 아동용", count: 25 },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:max-w-[70rem]">
      <SectionHeader
        title="자전거"
        description="당신의 라이프스타일에 맞는 완벽한 자전거를 찾아보세요. 스타일별 또는 브랜드별로 다양한 자전거를 만나볼 수 있습니다."
      />

      {/* Categories */}
      {/* <div className="grid gap-8 lg:grid-cols-2"> */}
      <div className="flex items-center justify-center">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group overflow-hidden transition-shadow hover:shadow-lg"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={600}
                  height={300}
                  className="h-64 w-[30rem] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
                <div className="absolute top-6 left-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 sm:h-12 sm:w-12">
                    <category.icon className="h-4 w-4 text-red-600 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
                  {category.title}
                </h2>
                <p className="mb-4 text-xs text-gray-600 sm:text-base">{category.description}</p>

                {/* Category Items */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-lg bg-gray-50 p-3"
                    >
                      <span className="text-xs font-medium text-gray-700 sm:text-sm">
                        {item.name}
                      </span>
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
    </div>
  );
}
