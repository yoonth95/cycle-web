import { Card } from "@/components/ui/card";
import type { AccessoriesPreparationSectionProps } from "@/types/products";
import { CheckCircle } from "lucide-react";

const AccessoriesPreparationSection = ({ data }: AccessoriesPreparationSectionProps) => {
  return (
    <div className="w-full">
      <Card className="from-figma-cinderella/10 border-0 bg-gradient-to-br to-white p-8 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-figma-cod-gray mb-2 text-xl font-bold">상담 전 준비사항</h2>
            <p className="text-gray-600">더 정확한 상담을 위해 아래 정보를 미리 준비해주세요</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.preparationItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="text-figma-thunderbird mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="text-sm leading-relaxed text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccessoriesPreparationSection;
