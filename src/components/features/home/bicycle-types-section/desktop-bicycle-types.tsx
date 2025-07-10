import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import type { BicycleTypesSectionType } from "@/types/home";

const DesktopBicycleTypes = ({ data }: { data: BicycleTypesSectionType["bicycleTypes"] }) => {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
      {data
        .sort((a, b) => a.order - b.order)
        .map((bicycle) => (
          <Card
            key={bicycle.order}
            className="group overflow-hidden transition-all duration-300 cursor-pointer border-none"
          >
            <AspectRatio ratio={3 / 4} className="relative overflow-hidden">
              <Image
                src={bicycle.image}
                alt={bicycle.title}
                className="object-cover transition-all duration-500"
                fill
              />
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0",
                  "flex flex-col justify-end",
                  "py-[10px] px-6 md:py-4",
                  "bg-black/60 group-hover:bg-black/70",
                  "text-white",
                  "overflow-hidden",
                  "h-[2.75rem] md:h-[3.7rem] lg:h-[3.9rem] group-hover:h-full",
                  "transition-all duration-500",
                )}
              >
                <div
                  className={cn(
                    "transition-transform duration-500",
                    "2xl:group-hover:-translate-y-64",
                    "lg:group-hover:-translate-y-56",
                    "md:group-hover:-translate-y-50",
                    "sm:group-hover:-translate-y-44",
                  )}
                >
                  <h3
                    className={cn(
                      "heading-5 text-white",
                      "text-base lg:text-[20px] md:text-[18px]",
                    )}
                  >
                    {bicycle.title}
                  </h3>
                </div>

                {/* 설명 - 호버 시에만 나타남 */}
                <div className="absolute bottom-20 left-6 right-6 opacity-0 h-3/8 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <p className={cn("body-large text-white", "text-sm md:text-base")}>
                    {bicycle.description}
                  </p>
                </div>

                {/* 버튼 - 호버 시에만 나타남 */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <Button
                    variant="outline"
                    className="bg-transparent hover:bg-transparent hover:text-white"
                  >
                    VIEW MORE
                  </Button>
                </div>
              </div>
            </AspectRatio>
          </Card>
        ))}
    </div>
  );
};

export default DesktopBicycleTypes;
