import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BicycleCard } from ".";
import { Bicycle, SubcategoryInfo } from "@/types/bicycle";

const BicycleSubcategoryTab = ({
  subcategories,
  initialBicycles,
}: {
  subcategories: SubcategoryInfo[];
  initialBicycles: Record<string, Bicycle[]>;
}) => {
  const defaultTab =
    subcategories.find((sub) => sub.isDefault)?.id || subcategories[0]?.id || "all";

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* 자연스러운 줄바꿈이 가능한 탭 */}
        <div className="w-full">
          <TabsList className="flex h-auto flex-wrap justify-center gap-2 rounded-lg border border-gray-200 bg-white sm:justify-start">
            {subcategories.map((sub) => (
              <TabsTrigger
                key={sub.id}
                value={sub.id}
                className="data-[state=active]:bg-figma-cinderella data-[state=active]:text-figma-thunderbird min-w-[130px] cursor-pointer px-4 py-1.5 text-center text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
              >
                {sub.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {subcategories.map((sub) => {
        const bicycles = initialBicycles[sub.id] || [];

        return (
          <TabsContent key={sub.id} value={sub.id}>
            {/* Products Grid */}
            {bicycles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {bicycles.map((bike) => (
                  <BicycleCard key={bike.id} bike={bike} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <div className="text-center">
                  <p className="text-gray-500">해당 카테고리에 제품이 없습니다.</p>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {bicycles.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="px-8">
                  더 많은 제품 보기
                </Button>
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default BicycleSubcategoryTab;
