"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AdminInquiryRecord } from "@/lib/admin/inquiries";

interface AdminInquiryManagerProps {
  inquiries: AdminInquiryRecord[];
}

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const AdminInquiryManager = ({ inquiries }: AdminInquiryManagerProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState<Record<string, string>>({});

  const handleReply = (contactId: string) => {
    const content = draft[contactId];
    if (!content?.trim()) {
      toast.error("답변 내용을 입력해주세요.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/inquiries/${contactId}/reply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit reply");
        }

        toast.success("답변이 등록되었습니다.");
        setDraft((prev) => ({ ...prev, [contactId]: "" }));
        router.refresh();
      } catch (error) {
        console.error("[AdminInquiryManager.reply]", error);
        toast.error("답변 등록에 실패했습니다.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {inquiries.length === 0 ? (
        <p className="text-muted-foreground">문의사항이 없습니다.</p>
      ) : (
        <Accordion type="single" collapsible className="space-y-2">
          {inquiries.map((inquiry) => {
            const comments = inquiry.contact_comments ?? [];
            const latestComment = comments[comments.length - 1];
            const hasAnswer = Boolean(latestComment);

            return (
              <AccordionItem key={inquiry.id} value={inquiry.id} className="rounded-lg border">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{inquiry.title}</span>
                    <span className="text-muted-foreground text-xs">
                      {inquiry.author} · {formatDateTime(inquiry.created_at)} ·{" "}
                      {inquiry.is_public ? "공개" : "비공개"}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-medium ${hasAnswer ? "text-emerald-600" : "text-destructive"}`}
                  >
                    {hasAnswer ? "답변 완료" : "미답변"}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 px-4 pb-4">
                    <div className="bg-muted/30 text-muted-foreground rounded-md border p-4 text-sm">
                      <h3 className="text-foreground font-medium">문의 내용</h3>
                      <p className="text-foreground mt-2 whitespace-pre-line">
                        {inquiry.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">답변 내역</h4>
                      {comments.length === 0 ? (
                        <p className="text-muted-foreground text-sm">등록된 답변이 없습니다.</p>
                      ) : (
                        <ul className="space-y-3 text-sm">
                          {comments.map((comment) => (
                            <li
                              key={comment.id}
                              className="bg-card rounded-md border p-3 shadow-sm"
                            >
                              <p className="whitespace-pre-line">{comment.content}</p>
                              <span className="text-muted-foreground mt-1 block text-xs">
                                {formatDateTime(comment.updated_at ?? comment.created_at)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Textarea
                        value={draft[inquiry.id] ?? ""}
                        onChange={(event) =>
                          setDraft((prev) => ({ ...prev, [inquiry.id]: event.target.value }))
                        }
                        rows={4}
                        placeholder="답변 내용을 입력하세요."
                        disabled={isPending}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleReply(inquiry.id)}
                          disabled={isPending || !draft[inquiry.id]?.trim().length}
                        >
                          {isPending ? "등록 중..." : "답변 등록"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default AdminInquiryManager;
