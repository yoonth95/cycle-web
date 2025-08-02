import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bicycle } from "@/types/bicycle";
import { Button } from "@/components/ui/button";
import { getBicycleUrlPath } from "@/utils/bicycle-data";

const BicycleCard = ({ bike }: { bike: Bicycle }) => (
  <Card className="group bg-white transition-shadow hover:shadow-lg">
    <CardContent className="flex h-full flex-col p-0">
      <AspectRatio ratio={26 / 15} className="relative">
        <Image src={bike.image} alt={bike.name} className="object-contain" fill />
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
      </AspectRatio>

      <div className="flex h-full flex-col justify-between p-6">
        <div>
          <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-red-600 lg:text-xl">
            {bike.name}
          </h3>

          {/* Specifications */}
          <div className="mb-4 flex flex-col gap-2">
            <h4 className="text-sm font-medium text-gray-700">주요 사양</h4>
            {bike.specs.map((spec, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="mr-2 h-1 w-1 rounded-full bg-gray-400"></div>
                {spec}
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-4 flex flex-col gap-2">
            <h4 className="text-sm font-medium text-gray-700">특징</h4>
            <div className="flex flex-wrap gap-1">
              {bike.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex">
          <Link
            href={`/bicycles/style/${getBicycleUrlPath(bike)}`}
            className="flex h-10 flex-1 items-center justify-center rounded-md bg-red-500 text-sm font-medium text-white hover:bg-red-600"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default BicycleCard;
