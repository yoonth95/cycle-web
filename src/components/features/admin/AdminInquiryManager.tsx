"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Accordion } from "@/components/ui/accordion";
import { InquiryItem } from "@/components/features/admin/inquiry";

import type {
  CommentActionHandlers,
  InquiryPendingStates,
  AdminInquiryRecord,
} from "@/types/inquiry";

interface AdminInquiryManagerProps {
  inquiries: AdminInquiryRecord[];
}

const AdminInquiryManager = ({ inquiries }: AdminInquiryManagerProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingReplyId, setPendingReplyId] = useState<string | null>(null);
  const [pendingEditId, setPendingEditId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const submitReply: CommentActionHandlers["onSubmitReply"] = (contactId, content) =>
    new Promise<boolean>((resolve) => {
      const trimmed = content.trim();
      if (!trimmed.length) {
        toast.error("답변 내용을 입력해주세요.");
        resolve(false);
        return;
      }

      setPendingReplyId(contactId);
      startTransition(async () => {
        try {
          const response = await fetch(`/api/admin/inquiries/${contactId}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: trimmed }),
          });

          if (!response.ok) {
            throw new Error("Failed to submit reply");
          }

          toast.success("답변이 등록되었습니다.");
          resolve(true);
          router.refresh();
        } catch (error) {
          console.error("[AdminInquiryManager.reply]", error);
          toast.error("답변 등록에 실패했습니다.");
          resolve(false);
        } finally {
          setPendingReplyId(null);
        }
      });
    });

  const updateComment: CommentActionHandlers["onUpdateComment"] = (
    contactId,
    commentId,
    content,
    originalContent,
  ) =>
    new Promise<boolean>((resolve) => {
      const trimmed = content.trim();
      if (!trimmed.length) {
        toast.error("수정할 답변 내용을 입력해주세요.");
        resolve(false);
        return;
      }

      if (trimmed === originalContent.trim()) {
        toast.info("변경된 내용이 없습니다.");
        resolve(false);
        return;
      }

      setPendingEditId(commentId);
      startTransition(async () => {
        try {
          const response = await fetch(`/api/admin/inquiries/${contactId}/comments/${commentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: trimmed }),
          });

          if (!response.ok) {
            throw new Error("Failed to update reply");
          }

          toast.success("답변이 수정되었습니다.");
          resolve(true);
          router.refresh();
        } catch (error) {
          console.error("[AdminInquiryManager.update]", error);
          toast.error("답변 수정에 실패했습니다.");
          resolve(false);
        } finally {
          setPendingEditId(null);
        }
      });
    });

  const deleteComment: CommentActionHandlers["onDeleteComment"] = (contactId, commentId) =>
    new Promise<boolean>((resolve) => {
      setPendingDeleteId(commentId);
      startTransition(async () => {
        try {
          const response = await fetch(`/api/admin/inquiries/${contactId}/comments/${commentId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete reply");
          }

          toast.success("답변이 삭제되었습니다.");
          resolve(true);
          router.refresh();
        } catch (error) {
          console.error("[AdminInquiryManager.delete]", error);
          toast.error("답변 삭제에 실패했습니다.");
          resolve(false);
        } finally {
          setPendingDeleteId(null);
        }
      });
    });

  const handlers: CommentActionHandlers = {
    onSubmitReply: submitReply,
    onUpdateComment: updateComment,
    onDeleteComment: deleteComment,
  };

  if (inquiries.length === 0) {
    return <p className="text-muted-foreground">문의사항이 없습니다.</p>;
  }

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-2">
      {inquiries.map((inquiry) => {
        const pendingStates: InquiryPendingStates = {
          isReplying: isPending && pendingReplyId === inquiry.id,
          editingCommentId: isPending ? pendingEditId : null,
          deletingCommentId: isPending ? pendingDeleteId : null,
        };

        return (
          <InquiryItem
            key={inquiry.id}
            inquiry={inquiry}
            handlers={handlers}
            pendingStates={pendingStates}
          />
        );
      })}
    </Accordion>
  );
};

export default AdminInquiryManager;
