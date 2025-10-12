"use client";

import { useEffect, useState } from "react";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AdminInquiryRecord } from "@/types/inquiry";

import { formatDate } from "@/utils/common";

interface InquiryCommentItemProps {
  comment: AdminInquiryRecord["contact_comments"][number];
  contactId: string;
  onUpdateComment: (
    contactId: string,
    commentId: string,
    content: string,
    originalContent: string,
  ) => Promise<boolean>;
  onDeleteComment: (contactId: string, commentId: string) => Promise<boolean>;
  isUpdating: boolean;
  isDeleting: boolean;
}

const InquiryCommentItem = ({
  comment,
  contactId,
  onUpdateComment,
  onDeleteComment,
  isUpdating,
  isDeleting,
}: InquiryCommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(comment.content);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setValue(comment.content);
    }
  }, [comment.content, isEditing]);

  const handleSave = async () => {
    const success = await onUpdateComment(contactId, comment.id, value, comment.content);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const success = await onDeleteComment(contactId, comment.id);
    if (success) {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <span className="text-muted-foreground text-xs">
          {formatDate(comment.updated_at ?? comment.created_at, true, true)}
          {comment.updated_at && comment.updated_at !== comment.created_at && (
            <span className="ml-1 text-indigo-500">· 수정됨</span>
          )}
        </span>
        <div className="flex gap-2">
          {isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              disabled={isUpdating || isDeleting}
            >
              취소
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setValue(comment.content);
                setIsEditing(true);
              }}
              disabled={isDeleting}
            >
              수정
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            disabled={isUpdating || isDeleting}
          >
            삭제
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={4}
          disabled={isUpdating}
        />
      ) : (
        <p className="whitespace-pre-line">{comment.content}</p>
      )}

      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? "저장 중..." : "저장"}
          </Button>
        </div>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-[18rem] [@media(min-width:375px)]:max-w-[20rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>답변을 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제하면 해당 답변은 복구할 수 없습니다. 계속 진행하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InquiryCommentItem;
