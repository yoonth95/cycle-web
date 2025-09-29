import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import type { BicycleTypesSectionType } from "@/types/home";

const DesktopBicycleTypes = ({ data }: { data: BicycleTypesSectionType["bicycleTypes"] }) => {
  return (
    <div className="grid grid-cols-3 gap-6 xl:grid-cols-4">
      {data
        .sort((a, b) => a.order - b.order)
        .map((bicycle) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${bicycle.image}`;
          return (
            <Card
              key={bicycle.order}
              className="group cursor-pointer overflow-hidden border-none transition-all duration-300"
            >
              <Link href={bicycle.link}>
                <AspectRatio ratio={3 / 4} className="relative overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={bicycle.title}
                    className="object-cover transition-all duration-500"
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 768px) 32vw, 100vw"
                  />
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "flex flex-col justify-end",
                      "px-6 py-[10px] md:py-4",
                      "bg-black/60 group-hover:bg-black/70",
                      "text-white",
                      "overflow-hidden",
                      "h-[2.75rem] group-hover:h-full md:h-[3.7rem] lg:h-[3.9rem]",
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
                          "text-base md:text-[18px] lg:text-[20px]",
                        )}
                      >
                        {bicycle.title}
                      </h3>
                    </div>

                    {/* 설명 - 호버 시에만 나타남 */}
                    <div className="absolute right-6 bottom-20 left-6 h-3/8 translate-y-4 opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div
                        className={cn("body-large text-white", "text-sm md:text-base")}
                        dangerouslySetInnerHTML={
                          typeof bicycle.description === "string"
                            ? { __html: bicycle.description }
                            : undefined
                        }
                        suppressHydrationWarning
                      />
                    </div>

                    {/* 버튼 - 호버 시에만 나타남 */}
                    <div className="absolute right-6 bottom-6 left-6 flex translate-y-4 justify-end opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Button
                        variant="outline"
                        className="bg-transparent hover:bg-transparent hover:text-white"
                      >
                        VIEW MORE
                      </Button>
                    </div>
                  </div>
                </AspectRatio>
              </Link>
            </Card>
          );
        })}
    </div>
  );
};

export default DesktopBicycleTypes;
