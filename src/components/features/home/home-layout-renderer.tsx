import HomeLayoutContent from "./home-layout-content";
import type { HomeLayoutData, HomePageContentData } from "@/types/home";

interface HomeLayoutRendererProps {
  layoutData: HomeLayoutData;
  contentData: HomePageContentData;
}

const HomeLayoutRenderer = ({ layoutData, contentData }: HomeLayoutRendererProps) => {
  const { layout } = layoutData;

  return (
    <div className={layout.className}>
      <HomeLayoutContent contentLayout={layout.content} contentData={contentData} />
    </div>
  );
};

export default HomeLayoutRenderer;
