import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDate, isNewArticle, isUpdatedArticle } from "@/utils/common";
import type { NoticeDetailType } from "@/types/notice";
import { Calendar, Pencil } from "lucide-react";

import styles from "./notice-detail-content.module.css";

export function NoticeDetailContent({ notice }: { notice: NoticeDetailType }) {
  return (
    <div className="mx-auto">
      {/* 공지사항 헤더 */}
      <div className="flex flex-col">
        <div className="py-4 sm:py-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-col gap-2.5">
              <div className="flex flex-col gap-2">
                {isNewArticle(notice.created_at) && (
                  <Badge variant="destructive" className="text-xs">
                    NEW
                  </Badge>
                )}
                <h1 className="text-2xl font-bold text-gray-900">{notice.title}</h1>
              </div>

              <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
                {/* 작성 날짜 */}
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span>{formatDate(notice.created_at, true)}</span>
                </div>

                {/* 수정 날짜 */}
                <div className="flex items-center gap-2">
                  <Pencil className="text-muted-foreground h-4 w-4" />
                  <div className="flex items-center gap-1">
                    <span>{formatDate(notice.updated_at, true)}</span>
                    {isUpdatedArticle(notice.created_at, notice.updated_at) && (
                      <span>(수정됨)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 공지사항 내용 */}
        <div className="py-4 sm:py-8">
          <div
            className={styles.content}
            dangerouslySetInnerHTML={
              typeof notice.content === "string" ? { __html: notice.content } : undefined
            }
            suppressHydrationWarning
          />
        </div>

        {/* 푸터 */}
        <div className="py-8">
          <Link
            href="/notices"
            prefetch={true}
            className="bg-figma-alizarin-crimson text-primary-foreground hover:bg-figma-thunderbird h-10 rounded-md px-4 py-2 text-sm font-medium"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
