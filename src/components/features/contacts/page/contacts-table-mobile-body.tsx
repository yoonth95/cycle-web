import React from "react";
import { cn } from "@/lib/utils";
import { formatDate, isUpdatedArticle } from "@/utils/common";
import { ContactsListItemType } from "@/types/contact";
import { Calendar, Lock, User } from "lucide-react";

export function ContactsTableMobileBody({
  contact,
  onClick,
}: {
  contact: ContactsListItemType;
  onClick: (contactId: string) => void;
}) {
  const isUpdated = isUpdatedArticle(contact.created_at, contact.updated_at);

  return (
    <div
      onClick={() => onClick(contact.id)}
      className="cursor-pointer p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {contact.is_private && (
            <Lock className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
          )}
          <div
            className={cn(
              "text-foreground flex-1 leading-relaxed font-medium",
              "line-clamp-2 text-pretty",
              "flex items-center gap-2",
            )}
          >
            <h3>{contact.title}</h3>
            {contact.contact_comments[0].count > 0 && (
              <span className="text-xs font-bold text-blue-600">
                [ {contact.contact_comments[0].count} ]
              </span>
            )}
          </div>
        </div>

        {/* 하단: 작성자와 날짜 */}
        <div className="text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span className="max-w-15 truncate text-xs [@media(min-width:375px)]:max-w-[120px]">
              {contact.author}
            </span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1 [@media(min-width:375px)]:gap-2">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">
              {formatDate(isUpdated ? contact.updated_at : contact.created_at, true)}
            </span>
            {isUpdated && <span className="text-xs">(수정됨)</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
