import { SpecificationItem } from "@/types/bicycle";

interface SpecsTabContentProps {
  specifications: SpecificationItem[];
}

const SpecsTabContent = ({ specifications }: SpecsTabContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-semibold">상세 사양</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {specifications.map((item, itemIndex) => (
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
  );
};

export default SpecsTabContent;
