import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/common";
import type { BlogListItemProps } from "@/types/blog";

export function BlogListItem({ blog }: BlogListItemProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${blog.images[0]}`;

  // description에서 HTML 태그 제거하고 텍스트만 추출
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ");
  const plainDescription = stripHtml(blog.description as string);

  return (
    <Link href={blog.link} target="_blank" rel="noopener noreferrer">
      <Card className="group transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* 이미지 섹션 */}
            {imageUrl && (
              <div className="relative hidden flex-shrink-0 [@media(min-width:425px)]:block">
                <div className="relative h-24 w-32 overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="128px"
                    quality={85}
                  />
                </div>
              </div>
            )}

            {/* 콘텐츠 섹션 */}
            <div className="min-w-0 flex-1 space-y-2">
              {/* 제목 */}
              <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                {blog.title}
              </h3>

              {/* 설명 - 2줄 제한 */}
              <p className="line-clamp-1 text-sm leading-relaxed text-gray-600">
                {plainDescription}
              </p>

              {/* 날짜 */}
              <p className="text-xs text-gray-400">{formatDate(blog.publishedAt, false)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
