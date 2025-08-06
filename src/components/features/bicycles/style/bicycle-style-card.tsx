import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import type { BicycleCard } from "@/types/bicycle";

interface BicycleStyleCardProps {
  card: BicycleCard;
}

const BicycleStyleCard = ({ card }: BicycleStyleCardProps) => {
  return (
    <Card className="group overflow-hidden bg-white transition-all hover:shadow-xl">
      <CardContent className="flex h-full flex-col overflow-hidden p-0">
        <AspectRatio ratio={3 / 4} className="relative overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Category Title on Image */}
          <div className="absolute right-4 bottom-4 left-4">
            <h2 className="mb-1 text-sm font-bold text-white sm:text-base lg:text-lg">
              {card.title}
            </h2>
            <p className="h-10 text-[10px] text-white/90 sm:text-xs lg:text-sm">
              {card.description}
            </p>
          </div>
        </AspectRatio>

        <div className="mt-4 flex h-full flex-col justify-between px-6 pb-6 sm:mt-6">
          {/* Subcategories */}
          {card.items.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h3 className="mb-2 text-xs font-medium text-gray-700 sm:text-sm">하위 카테고리</h3>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                {card.items
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="hover:bg-figma-cinderella hover:text-figma-thunderbird flex items-center justify-center rounded-lg bg-gray-50 p-2 text-gray-700 transition-colors sm:p-3"
                    >
                      <span className="text-xs sm:text-xs md:text-sm">{item.title}</span>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          <Link href={card.link} className="mt-auto block">
            <Button className="w-full bg-red-500 text-xs hover:bg-red-600 sm:text-sm md:text-base">
              {card.title} 전체보기
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BicycleStyleCard;
