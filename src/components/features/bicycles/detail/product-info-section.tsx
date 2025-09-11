import { Badge } from "@/components/ui/badge";
import { getTagColor } from "@/utils/common";
import { BicycleTag } from "@/types/bicycle";

interface ProductInfoSectionProps {
  name: string;
  description: string;
  features: string[];
  tags: BicycleTag[];
}

const ProductInfoSection = ({ name, description, features, tags }: ProductInfoSectionProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant={tag.variant}
              className={`rounded px-2 py-1 text-xs font-medium text-white ${getTagColor(tag.color)}`}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{name}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Features */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">특징</h3>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
