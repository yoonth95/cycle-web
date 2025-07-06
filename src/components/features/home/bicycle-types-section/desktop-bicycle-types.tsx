import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { bicycleTypes } from "./bicycle-types-section";

const DesktopBicycleTypes = () => {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
      {bicycleTypes.map((bicycle, index) => (
        <Card
          key={index}
          className="group overflow-hidden transition-all duration-300 cursor-pointer border-none"
        >
          <AspectRatio ratio={3 / 4}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Image src={bicycle.image} alt={bicycle.title} fill />
                </div>
              </div>
            </div>
          </AspectRatio>
        </Card>
      ))}
    </div>
  );
};

export default DesktopBicycleTypes;
