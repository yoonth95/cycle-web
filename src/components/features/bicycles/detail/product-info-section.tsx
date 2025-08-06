import { Badge } from "@/components/ui/badge";

interface ProductInfoSectionProps {
  name: string;
  description: string;
  features: string[];
}

const ProductInfoSection = ({ name, description, features }: ProductInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Badge className="bg-red-500 text-white">NEW</Badge>
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
