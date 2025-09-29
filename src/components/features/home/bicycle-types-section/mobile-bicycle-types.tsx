import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BicycleTypesSectionType } from "@/types/home";

const MobileBicycleTypes = ({
  windowWidth,
  data,
}: {
  windowWidth: number;
  data: BicycleTypesSectionType["bicycleTypes"];
}) => {
  return (
    <div className={cn(`grid gap-4`, windowWidth < 475 ? "grid-cols-3" : "grid-cols-4")}>
      {data
        .sort((a, b) => a.order - b.order)
        .map((bicycle) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${bicycle.image}`;

          return (
            <Link key={bicycle.title} href={bicycle.link}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={imageUrl}
                  alt={bicycle.title}
                  width={100}
                  height={100}
                  sizes="(max-width: 474px) 33vw, 25vw"
                />
                <p className="body-small-strong text-foreground mb-3">{bicycle.title}</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default MobileBicycleTypes;
