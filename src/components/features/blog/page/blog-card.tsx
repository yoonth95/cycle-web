import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/common";
import type { BlogCardProps } from "@/types/blog";

export function BlogCard({ blog }: BlogCardProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${blog.images[0]}`;

  // description에서 HTML 태그 제거하고 텍스트만 추출
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ");
  const plainDescription = stripHtml(blog.description as string);

  return (
    <Link href={blog.link} target="_blank" rel="noopener noreferrer">
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <CardContent className="p-0">
          {/* 이미지 섹션 */}
          {imageUrl && (
            <div className="relative overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={85}
                />
              </div>

              {/* 오버레이 */}
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
            </div>
          )}

          {/* 콘텐츠 섹션 */}
          <div className="flex h-[160px] flex-col justify-between p-4">
            <div className="flex flex-col gap-2">
              {/* 제목 */}
              <h3 className="line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                {blog.title}
              </h3>

              {/* 설명 */}
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                {plainDescription}
              </p>
            </div>

            {/* 날짜 */}
            <p className="text-xs text-gray-400">{formatDate(blog.publishedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
