import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate, isUpdatedArticle } from "@/utils/common";
import type { ContactWithComments } from "@/types/contact";
import { CircleQuestionMark, MessageSquare, Shield } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "답변완료":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "답변대기":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "처리중":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

interface ContactDetailContentProps {
  contact: ContactWithComments;
}
export function ContactDetailContent({ contact }: ContactDetailContentProps) {
  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      <div className="mx-auto flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          {contact.contact_comments && contact.contact_comments.length > 0 ? (
            <Badge className={getStatusColor("답변완료")}>답변완료</Badge>
          ) : (
            <Badge className={getStatusColor("답변대기")}>답변대기</Badge>
          )}
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-foreground text-2xl font-semibold">{contact.title}</h2>
              <span className="text-muted-foreground text-sm">
                {contact.author} · {formatDate(contact.created_at, true)} ·{" "}
                {contact.is_public ? "공개" : "비공개"}
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-foreground flex items-center gap-2 font-medium">
                <div className="h-4 w-4">
                  <CircleQuestionMark className="h-5 w-5" />
                </div>
                <h3 className="text-lg">문의 내용</h3>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {contact.description}
                </p>
              </div>
            </div>

            {contact.contact_comments && contact.contact_comments.length > 0 && (
              <div>
                <div className="text-foreground mb-3 flex items-center space-x-2 text-lg font-medium">
                  <div className="h-4 w-4">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg">관리자 답변</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {contact.contact_comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-blue-600 text-white">
                              <Shield className="h-3 w-3" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-foreground font-medium">관리자</span>
                        </div>
                        <span className="text-muted-foreground flex items-center gap-1 text-sm">
                          {formatDate(comment.created_at, true)}
                          {isUpdatedArticle(comment.created_at, comment.updated_at) && (
                            <span>(수정됨)</span>
                          )}
                        </span>
                      </div>
                      <p className="text-foreground leading-relaxed whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!contact.contact_comments ||
              (contact.contact_comments.length === 0 && (
                <div className="py-8 text-center">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <MessageSquare className="text-muted-foreground mx-auto mb-3 h-12 w-12" />
                    <p className="text-muted-foreground">아직 관리자 답변이 등록되지 않았습니다.</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      답변이 등록되면 이메일로 알림을 받으실 수 있습니다.
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Link
            href="/notices"
            prefetch={true}
            className="items-cetner bg-figma-alizarin-crimson text-primary-foreground hover:bg-figma-thunderbird flex h-10 justify-center rounded-md px-4 py-2 text-sm font-medium"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
