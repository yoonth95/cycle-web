import Image from "next/image";
import { cn } from "@/utils/cn";
import type { BicycleType } from "@/types";

const MobileBicycleTypes = ({
  windowWidth,
  data,
}: {
  windowWidth: number;
  data: BicycleType[];
}) => {
  return (
    <div className={cn(`grid gap-4`, windowWidth < 475 ? "grid-cols-3" : "grid-cols-4")}>
      {data.map((bicycle: BicycleType) => (
        <div key={bicycle.title} className="flex flex-col items-center justify-center">
          <Image src={bicycle.image} alt={bicycle.title} width={100} height={100} />
          <p className="body-small-strong text-foreground mb-3">{bicycle.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MobileBicycleTypes;
