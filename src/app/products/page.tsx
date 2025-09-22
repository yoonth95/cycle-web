import { redirect } from "next/navigation";
import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "제품",
    description: "삼천리자전거의 다양한 제품을 만나보세요. 자전거와 액세서리를 확인하세요.",
    keywords: ["삼천리자전거", "제품", "자전거", "액세서리"],
    url: "/products",
    type: "website",
  });
}

export default function ProductsPage() {
  redirect("/products/accessories");
}
