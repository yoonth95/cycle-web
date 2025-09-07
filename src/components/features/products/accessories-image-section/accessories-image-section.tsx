import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { AccessoriesImageSectionProps } from "@/types/products";

export function AccessoriesImageSection({ data }: AccessoriesImageSectionProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${data.image}`;

  return (
    <div className="flex min-h-[30vh] w-full items-center justify-center px-4 pb-4 md:min-h-[40vh] lg:min-h-[50vh]">
      <div className="w-full max-w-[90%] overflow-hidden rounded-3xl md:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%]">
        <AspectRatio ratio={4 / 3}>
          <Image src={imageUrl} alt="자전거 용품 이미지" fill className="object-cover" />
        </AspectRatio>
      </div>
    </div>
  );
}
