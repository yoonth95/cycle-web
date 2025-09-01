import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { iconMapping } from "@/utils/icon-mapping";
import type { BicycleCardType } from "@/types/bicycle";

interface BicycleCardProps {
  card: BicycleCardType;
}

const BicycleCard = ({ card }: BicycleCardProps) => {
  const IconComponent = iconMapping[card.icon as keyof typeof iconMapping];

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            width={600}
            height={300}
            className="h-64 w-[30rem] object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
            priority={false}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBHz2HaH9bcfaSXWGaRmknyBH//Q"
          />
          <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
          <div className="absolute top-6 left-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 sm:h-12 sm:w-12">
              {IconComponent && <IconComponent className="h-4 w-4 text-red-600 sm:h-6 sm:w-6" />}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">{card.title}</h2>
          <p className="mb-4 text-xs text-gray-600 sm:text-base">{card.description}</p>

          <div className="mb-6 grid grid-cols-2 gap-3">
            {card.items
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="flex items-center justify-center rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                >
                  <span className="text-xs font-medium text-gray-700 sm:text-sm">{item.title}</span>
                </Link>
              ))}
          </div>

          <Link href={card.link}>
            <Button className="w-full bg-red-500 hover:bg-red-600">{card.title} 보기</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BicycleCard;
