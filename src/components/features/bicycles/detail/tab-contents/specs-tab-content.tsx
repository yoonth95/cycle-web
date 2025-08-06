import { SpecificationCategory } from "@/types/bicycle";

interface SpecsTabContentProps {
  specifications: SpecificationCategory[];
}

const SpecsTabContent = ({ specifications }: SpecsTabContentProps) => {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">상세 사양</h3>
      {specifications.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h4 className="border-b border-gray-200 pb-2 text-lg font-medium text-gray-900">
            {category.category}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex} className="border-b border-gray-100">
                    <td className="w-1/3 bg-gray-50 px-4 py-3 font-medium text-gray-700">
                      {item.spec}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecsTabContent;
