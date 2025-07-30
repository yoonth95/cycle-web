"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BicycleTabsClientProps {
  subcategories: { id: string; name: string; isDefault?: boolean }[];
  children: React.ReactNode;
}

const BicycleTabsClient = ({ subcategories, children }: BicycleTabsClientProps) => {
  const searchParams = useSearchParams();

  // 기본 탭 결정: isDefault 우선, 없으면 "all", 그 다음 첫 번째 값, 최종적으로 "all"
  const defaultTab =
    subcategories.find((sub) => sub.isDefault)?.id ??
    subcategories.find((sub) => sub.id === "all")?.id ??
    subcategories[0]?.id ??
    "all";

  // URL 쿼리스트링에서 현재 탭 가져오기, 기본값은 defaultTab
  const currentTab = searchParams.get("tab") || defaultTab;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
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
      {children}
    </Tabs>
  );
};

export default BicycleTabsClient;
