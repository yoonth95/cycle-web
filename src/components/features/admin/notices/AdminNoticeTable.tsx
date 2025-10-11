"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/common";
import { formatViewCount } from "@/utils/notices-utils";
import type { AdminNoticeRecord } from "@/lib/admin/notices";
import { cn } from "@/lib/utils";

interface AdminNoticeTableProps {
  notices: AdminNoticeRecord[];
}

export function AdminNoticeTable({ notices }: AdminNoticeTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedNotice, setSelectedNotice] = useState<AdminNoticeRecord | null>(null);

  const orderedNotices = useMemo(() => {
    return [...notices].sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [notices]);

  const handleDelete = () => {
    if (!selectedNotice) return;
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/notices/${selectedNotice.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete notice");
        }

        toast.success("공지사항이 삭제되었습니다.");
        setSelectedNotice(null);
        router.refresh();
      } catch (error) {
        console.error("[AdminNoticeTable.delete]", error);
        toast.error("공지사항 삭제에 실패했습니다.");
      }
    });
  };

  const handleEdit = (noticeId: string) => {
    router.push(`/admin/notices/${noticeId}/edit`);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead className="w-16 text-center">순번</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-36 text-center">작성 날짜</TableHead>
              <TableHead className="w-24 text-center">조회수</TableHead>
              <TableHead className="w-24 text-center">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderedNotices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground h-32 text-center">
                  등록된 공지사항이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              orderedNotices.map((notice, index) => {
                const sequence = orderedNotices.length - index;
                return (
                  <TableRow key={notice.id} className="text-sm">
                    <TableCell className="text-muted-foreground text-center font-medium">
                      {sequence}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground font-semibold">{notice.title}</span>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                          <Badge
                            variant={notice.is_published ? "default" : "outline"}
                            className={cn(
                              "px-2 py-1",
                              notice.is_published
                                ? "border-transparent bg-emerald-500 text-white"
                                : "text-muted-foreground border-dashed",
                            )}
                          >
                            {notice.is_published ? "게시" : "비공개"}
                          </Badge>
                          {notice.is_pinned ? (
                            <Badge variant="secondary" className="px-2 py-1">
                              상단 고정
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-center">
                      {formatDate(notice.created_at, true)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-center">
                      {formatViewCount(notice.view_count)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(notice.id)}
                          aria-label={`${notice.title} 수정`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setSelectedNotice(notice)}
                          disabled={isPending}
                          aria-label={`${notice.title} 삭제`}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!selectedNotice}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedNotice(null);
          }
        }}
      >
        <AlertDialogContent className="max-w-[18rem] [@media(min-width:375px)]:max-w-[20rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>공지사항을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제된 공지사항은 복구할 수 없습니다. 계속 진행하려면 삭제 버튼을 눌러주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isPending}
            >
              {isPending ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AdminNoticeTable;
