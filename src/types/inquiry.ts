import { z } from "zod";

export const InquiryPendingStatesSchema = z.object({
  isReplying: z.boolean(),
  editingCommentId: z.string().nullable(),
  deletingCommentId: z.string().nullable(),
});

export const CommentActionHandlersSchema = z.object({
  onSubmitReply: z.function().args(z.string(), z.string()).returns(z.promise(z.boolean())),
  onUpdateComment: z
    .function()
    .args(z.string(), z.string(), z.string(), z.string())
    .returns(z.promise(z.boolean())),
  onDeleteComment: z.function().args(z.string(), z.string()).returns(z.promise(z.boolean())),
});

export const AdminInquiryCommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const AdminInquiryRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  email: z.string().email(),
  is_public: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  contact_comments: z
    .array(AdminInquiryCommentSchema)
    .nullish()
    .transform((value) => value ?? []),
});

export const AdminInquiryRecordListSchema = z.array(AdminInquiryRecordSchema);

export type AdminInquiryRecord = z.infer<typeof AdminInquiryRecordSchema>;
export type AdminInquiryComment = z.infer<typeof AdminInquiryCommentSchema>;
export type InquiryPendingStates = z.infer<typeof InquiryPendingStatesSchema>;
export type CommentActionHandlers = z.infer<typeof CommentActionHandlersSchema>;
