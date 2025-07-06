import Image from "next/image";
import { bicycleTypes } from "./bicycle-types-section";
import { cn } from "@/utils/cn";

const MobileBicycleTypes = ({ windowWidth }: { windowWidth: number }) => {
  return (
    <div className={cn(`grid gap-4`, windowWidth < 475 ? "grid-cols-3" : "grid-cols-4")}>
      {bicycleTypes.map((bicycle) => (
        <div key={bicycle.title} className="flex flex-col items-center justify-center">
          <Image src={bicycle.image} alt={bicycle.title} width={100} height={100} />
          <p className="body-small-strong text-foreground mb-3">{bicycle.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MobileBicycleTypes;
