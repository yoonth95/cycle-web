import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bicycle } from "@/types/bicycle";

const BicycleCard = ({ bike }: { bike: Bicycle }) => (
  <Card className="group bg-white transition-shadow hover:shadow-lg">
    <CardContent className="p-0">
      <div className="relative">
        <AspectRatio ratio={26 / 15}>
          <Image src={bike.image} alt={bike.name} className="object-contain" fill />
        </AspectRatio>
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
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-red-600 lg:text-xl">
          {bike.name}
        </h3>
        <p className="mb-2 text-xl font-bold text-gray-900 lg:text-2xl">{bike.price}</p>

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
        </div>
      </div>
    </CardContent>
  </Card>
);

export default BicycleCard;
