import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { isNewNotice, isUpdatedNotice } from "@/utils/notices-utils";
import { formatDate } from "@/utils/common";
import type { NoticeDetailType } from "@/types/notice";
import { Calendar } from "lucide-react";
import Link from "next/link";

export function NoticeDetailContent({ notice }: { notice: NoticeDetailType }) {
  return (
    <div className="mx-auto">
      {/* 공지사항 헤더 */}
      <div className="flex flex-col">
        <div className="py-4 sm:py-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-col gap-2.5">
              <div className="flex flex-col gap-2">
                {isNewNotice(notice.created_at) && (
                  <Badge variant="destructive" className="text-xs">
                    NEW
                  </Badge>
                )}
                <h1 className="text-2xl font-bold text-gray-900">{notice.title}</h1>
              </div>

              <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span>
                    {formatDate(
                      isUpdatedNotice(notice.created_at, notice.updated_at)
                        ? notice.updated_at
                        : notice.created_at,
                      true,
                    )}
                    {isUpdatedNotice(notice.created_at, notice.updated_at) && (
                      <span className="ml-1">(수정됨)</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 공지사항 내용 */}
        <div className="py-4 sm:py-8">
          <div dangerouslySetInnerHTML={{ __html: notice.content }} suppressHydrationWarning />
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
