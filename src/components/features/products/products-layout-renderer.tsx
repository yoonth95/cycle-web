import ProductsLayoutContent from "./products-layout-content";
import type { ProductsLayoutData, ProductsPageContentData } from "@/types/products";

interface ProductsLayoutRendererProps {
  layoutData: ProductsLayoutData;
  contentData: ProductsPageContentData;
}

const ProductsLayoutRenderer = ({ layoutData, contentData }: ProductsLayoutRendererProps) => {
  const { layout } = layoutData;

  return (
    <div className={layout.className}>
      <ProductsLayoutContent contentLayout={layout.content} contentData={contentData} />
    </div>
  );
};

export default ProductsLayoutRenderer;
