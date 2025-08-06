import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { CategoryContentSection, BicycleItem } from "@/types/bicycle";

interface CategoryLayoutBicycleListProps {
  section: CategoryContentSection;
  bicycles?: BicycleItem[];
  categorySlug?: string;
}

const getTagColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
    gray: "bg-gray-500 text-white",
  };
  return colorMap[color] || "bg-gray-500 text-white";
};

const CategoryLayoutBicycleList = ({
  section,
  bicycles = [],
  categorySlug,
}: CategoryLayoutBicycleListProps) => {
  if (bicycles.length === 0) {
    return (
      <div className={section.className}>
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">해당 카테고리에 자전거가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={section.className}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {bicycles.map((bicycle) => (
          <div
            key={bicycle.id}
            className="flex flex-col rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* 자전거 이미지 */}
            <AspectRatio ratio={26 / 15} className="relative rounded-t">
              <Image
                src={bicycle.image}
                alt={bicycle.name}
                fill
                className="rounded-t object-cover"
              />

              {/* 태그들 */}
              <div className="absolute top-2 left-2 flex gap-1">
                {bicycle.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`rounded px-2 py-1 text-xs font-medium ${getTagColor(tag.color)}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </AspectRatio>

            {/* 자전거 정보 */}
            <div className="flex h-full flex-col justify-between gap-4 rounded-b border-x border-b border-gray-200 p-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-900">{bicycle.name}</h3>

                {/* 사양 */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-900">주요 사양</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {bicycle.specs.map((spec, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="mr-2 ml-3 h-1 w-1 rounded-full bg-gray-400"></div>
                        {spec}
                      </div>
                    ))}
                  </ul>
                </div>

                {/* 특징 */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-900">특징</p>
                  <div className="flex flex-wrap gap-1">
                    {bicycle.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <Link
                href={`/bicycles/style/${categorySlug || bicycle.category.toLowerCase()}/${bicycle.id}`}
              >
                <Button className="w-full bg-red-500 hover:bg-red-600">자세히 보기</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLayoutBicycleList;
