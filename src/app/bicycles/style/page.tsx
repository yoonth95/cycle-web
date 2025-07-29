import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/common/section-header";
import bicycleStylesData from "@/data/bicycle-styles.json";

export default function StylePage() {
  const { styleCategories } = bicycleStylesData;

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-2 py-8 sm:px-4 lg:max-w-[70rem]">
        <SectionHeader
          title="스타일별 자전거"
          description="당신의 라이프스타일에 맞는 자전거를 스타일별로 찾아보세요. 각 카테고리별로 다양한 옵션을 제공합니다."
        />

        {/* Style Categories Grid */}
        <div className="grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-3 [@media(min-width:425px)_and_(max-width:768px)]:grid-cols-2">
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

                  {/* Total Count Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-xs text-gray-900 sm:text-sm">
                      총 {category.totalCount}개
                    </Badge>
                  </div>

                  {/* Category Title on Image */}
                  <div className="absolute right-4 bottom-4 left-4">
                    <h2 className="mb-1 text-sm font-bold text-white sm:text-base lg:text-lg">
                      {category.title}
                    </h2>
                    <p className="h-10 text-[10px] text-white/90 sm:text-xs lg:text-sm">
                      {category.description}
                    </p>
                  </div>
                </AspectRatio>

                <div className="mt-4 flex h-full flex-col justify-between px-6 pb-6 sm:mt-6">
                  {/* Subcategories */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="mb-2 text-xs font-medium text-gray-700 sm:text-sm">
                      하위 카테고리
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {category.subcategories.map((sub, index) => (
                        <Link
                          key={index}
                          href={`/bicycles/style/${category.slug}?tab=${sub.slug}`}
                          className="hover:bg-figma-cinderella flex items-center justify-between rounded-lg bg-gray-50 p-2 transition-colors sm:p-3"
                        >
                          <span className="text-xs text-gray-700 sm:text-xs md:text-sm">
                            {sub.name}
                          </span>
                          <span className="text-[10px] sm:text-xs">{sub.count}개</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href={`/bicycles/style/${category.slug}`} className="mt-auto block">
                    <Button className="w-full bg-red-500 text-xs hover:bg-red-600 sm:text-sm md:text-base">
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
