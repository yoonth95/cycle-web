"use client";

import { InquiryCommentItem } from "@/components/features/admin/inquiry";
import type { AdminInquiryRecord } from "@/types/inquiry";

interface InquiryCommentsProps {
  comments: AdminInquiryRecord["contact_comments"];
  contactId: string;
  onUpdateComment: (
    contactId: string,
    commentId: string,
    content: string,
    originalContent: string,
  ) => Promise<boolean>;
  onDeleteComment: (contactId: string, commentId: string) => Promise<boolean>;
  editingCommentId: string | null;
  deletingCommentId: string | null;
}

const InquiryComments = ({
  comments,
  contactId,
  onUpdateComment,
  onDeleteComment,
  editingCommentId,
  deletingCommentId,
}: InquiryCommentsProps) => (
  <div className="flex flex-col gap-2">
    <h4 className="text-sm font-semibold">답변 내역</h4>
    {comments.length === 0 ? (
      <p className="text-muted-foreground text-sm">등록된 답변이 없습니다.</p>
    ) : (
      <ul className="flex flex-col gap-2 text-sm">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-card rounded-md border p-3 shadow-sm">
            <InquiryCommentItem
              comment={comment}
              contactId={contactId}
              onUpdateComment={onUpdateComment}
              onDeleteComment={onDeleteComment}
              isUpdating={editingCommentId === comment.id}
              isDeleting={deletingCommentId === comment.id}
            />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default InquiryComments;
