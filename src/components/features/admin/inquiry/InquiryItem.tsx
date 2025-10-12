"use client";

import { useState } from "react";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  InquiryComments,
  InquiryDetail,
  InquiryReplyForm,
} from "@/components/features/admin/inquiry";
import { formatDate } from "@/utils/common";

import type {
  AdminInquiryRecord,
  CommentActionHandlers,
  InquiryPendingStates,
} from "@/types/inquiry";

interface InquiryItemProps {
  inquiry: AdminInquiryRecord;
  handlers: CommentActionHandlers;
  pendingStates: InquiryPendingStates;
}

const InquiryItem = ({ inquiry, handlers, pendingStates }: InquiryItemProps) => {
  const [replyDraft, setReplyDraft] = useState("");

  const comments = inquiry.contact_comments ?? [];
  const hasAnswer = comments.length > 0;

  const handleSubmitReply = async () => {
    const success = await handlers.onSubmitReply(inquiry.id, replyDraft);
    if (success) {
      setReplyDraft("");
    }
  };

  return (
    <AccordionItem value={inquiry.id} className="rounded-lg border last:border-b">
      <AccordionTrigger className="p-4 text-left">
        <div className="flex flex-col gap-1 text-left">
          <span className="font-medium">{inquiry.title}</span>
          <span className="text-muted-foreground text-xs">
            {inquiry.author} · {formatDate(inquiry.created_at, true, true)} ·{" "}
            {inquiry.is_public ? "공개" : "비공개"}
          </span>
          <span
            className={`text-xs font-medium ${hasAnswer ? "text-emerald-600" : "text-destructive"}`}
          >
            {hasAnswer ? "답변 완료" : "미답변"}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-4 flex flex-col gap-6 px-4">
        <InquiryDetail description={inquiry.description} />
        <InquiryComments
          comments={comments}
          contactId={inquiry.id}
          onUpdateComment={handlers.onUpdateComment}
          onDeleteComment={handlers.onDeleteComment}
          editingCommentId={pendingStates.editingCommentId}
          deletingCommentId={pendingStates.deletingCommentId}
        />
        <InquiryReplyForm
          value={replyDraft}
          onChange={setReplyDraft}
          onSubmit={handleSubmitReply}
          disabled={pendingStates.isReplying}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default InquiryItem;
