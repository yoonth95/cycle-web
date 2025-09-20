import { z } from "zod";

// =============================================================================
// DB 스키마 - Raw 데이터 타입
// =============================================================================

// Contact Comments DB 스키마
export const ContactCommentItemSchema = z.object({
  id: z.string(),
  contact_id: z.string(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const DbContactRowSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  email: z.string().email(),
  is_public: z.boolean(),
  password: z.string().nullable(),
  contact_comments: z.array(ContactCommentItemSchema),
  created_at: z.string(),
  updated_at: z.string(),
});

// 비밀번호 입력
export const ContactDetailPasswordFormDataSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(4, "비밀번호는 4자 이상 입력해 주세요")
    .max(6, "비밀번호는 6자 이내로 입력해 주세요")
    .refine((val) => val.trim().length > 0, "비밀번호를 입력해 주세요"),
});

// =============================================================================
// Contacts New 폼 데이터 타입
// =============================================================================

export const ContactsFormDataSchema = z
  .object({
    title: z
      .string()
      .min(1, "제목을 입력해 주세요")
      .max(200, "제목은 200자 이내로 입력해 주세요")
      .refine((val) => val.trim().length > 0, "제목을 입력해 주세요"),
    description: z
      .string()
      .min(1, "문의 내용을 입력해 주세요")
      .max(2000, "문의 내용은 2000자 이내로 입력해 주세요")
      .refine((val) => val.trim().length > 0, "문의 내용을 입력해 주세요"),
    author: z
      .string()
      .min(1, "이름을 입력해 주세요")
      .max(100, "이름은 100자 이내로 입력해 주세요")
      .refine((val) => val.trim().length > 0, "이름을 입력해 주세요"),
    emailLocal: z
      .string()
      .min(1, "이메일 아이디를 입력해 주세요")
      .max(64, "이메일 아이디는 64자 이내로 입력해 주세요")
      .regex(/^[a-zA-Z0-9._%+-]+$/, "올바른 이메일 아이디 형식을 입력해 주세요")
      .refine((val) => val.trim().length > 0, "이메일 아이디를 입력해 주세요"),
    emailDomain: z
      .string()
      .min(1, "이메일 도메인을 선택해 주세요")
      .refine((val) => val.trim().length > 0, "이메일 도메인을 선택해 주세요")
      .refine((domain) => {
        // 직접 입력된 도메인의 경우 추가 검증
        if (domain.includes(".") && /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
          return true;
        }
        // 사전 정의된 도메인인 경우 통과
        const predefinedDomains = [
          "naver.com",
          "gmail.com",
          "daum.net",
          "hanmail.net",
          "yahoo.com",
          "hotmail.com",
          "outlook.com",
          "nate.com",
          "kakao.com",
        ];
        return predefinedDomains.includes(domain);
      }, "올바른 도메인 형식을 입력해 주세요"),
    isPublic: z.boolean(),
    password: z
      .string()
      .optional()
      .or(z.literal(""))
      .transform((val) => (val === "" ? undefined : val)),
  })
  .refine(
    (data) => {
      // 공개 글인 경우 비밀번호는 필요 없음
      if (data.isPublic) return true;
      // 비공개 글인 경우 비밀번호 필수 및 길이 검증
      return data.password && data.password.trim().length >= 4 && data.password.trim().length <= 6;
    },
    {
      message: "비공개 문의의 경우 비밀번호(4-6자)를 입력해 주세요",
      path: ["password"],
    },
  );

// 최종 폼 데이터 타입 (email 필드 포함)
export type ContactsFormData = z.infer<typeof ContactsFormDataSchema> & {
  email: string;
};

// =============================================================================
// Contacts 페이지 타입
// =============================================================================

// 공통 스키마
export const ContactsHeaderSectionSchema = z.object({
  id: z.number(),
  section: z.literal("contacts-header"),
  order: z.number(),
  title: z.string(),
  className: z.string(),
  description: z.union([
    z.string(),
    z.object({
      ops: z.array(z.record(z.string(), z.unknown())),
    }),
  ]),
});

export const ContactsContentSectionBaseSchema = z.object({
  id: z.number(),
  order: z.number(),
  section: z.enum(["contacts-header", "contacts-table", "contacts-form"]),
  className: z.string().optional(),
});

// Contacts 페이지 스키마
export const ContactsListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  is_public: z.boolean(),
  contact_comments: z.array(ContactCommentItemSchema).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ContactsListParamsSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  sortBy: z.enum(["created_at"]),
  sortOrder: z.enum(["asc", "desc"]),
});

export const ContactsListResponseSchema = z.object({
  contacts: z.array(ContactsListItemSchema),
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
  hasMore: z.boolean(),
});

// Contacts Table 섹션 스키마
export const ContactsLayoutContentTableSchema = ContactsContentSectionBaseSchema.extend({
  section: z.literal("contacts-table"),
  defaultValues: ContactsListParamsSchema,
});

// Contacts Form 섹션 스키마
export const FormConfigSchema = z.object({
  titlePlaceholder: z.string(),
  descriptionPlaceholder: z.string(),
  authorPlaceholder: z.string(),
  emailPlaceholder: z.string(),
  passwordPlaceholder: z.string(),
  submitButtonText: z.string(),
  successMessage: z.string(),
  errorMessage: z.string(),
});
export const ContactsFormSectionSchema = ContactsContentSectionBaseSchema.extend({
  section: z.literal("contacts-form"),
  formConfig: FormConfigSchema,
});

export const ContactsLayoutContentSectionSchema = z.discriminatedUnion("section", [
  ContactsHeaderSectionSchema,
  ContactsLayoutContentTableSchema,
  ContactsFormSectionSchema,
]);

export const ContactsSubmissionResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.string().optional(),
});

// =============================================================================
// 레이아웃 데이터 스키마
// =============================================================================
export const ContactsLayoutContentSchema = z.object({
  sections: z.array(ContactsLayoutContentSectionSchema),
  className: z.string().optional(),
});

export const ContactsLayoutSchema = z.object({
  type: z.enum(["contacts-page", "contacts-new-page"]),
  content: ContactsLayoutContentSchema,
  className: z.string().optional(),
});

export const ContactsLayoutDataSchema = z.object({
  layout: ContactsLayoutSchema,
});

// =============================================================================
// 타입 추출
// =============================================================================

// 공통 타입
export type DbContactRow = z.infer<typeof DbContactRowSchema>;
export type ContactCommentItem = z.infer<typeof ContactCommentItemSchema>;
export type ContactWithComments = z.infer<typeof DbContactRowSchema>;

// Contacts New 페이지 타입
export type ContactDetailPasswordFormData = z.infer<typeof ContactDetailPasswordFormDataSchema>;
export type ContactsHeaderSection = z.infer<typeof ContactsHeaderSectionSchema>;
export type ContactsLayoutContent = z.infer<typeof ContactsLayoutContentSchema>;
export type ContactsLayout = z.infer<typeof ContactsLayoutSchema>;
export type ContactsLayoutData = z.infer<typeof ContactsLayoutDataSchema>;

// Contacts 페이지 타입
export type ContactsListItemType = z.infer<typeof ContactsListItemSchema>;
export type ContactsListParamsType = z.infer<typeof ContactsListParamsSchema>;
export type ContactsListResponseType = z.infer<typeof ContactsListResponseSchema>;
export type ContactsLayoutContentTable = z.infer<typeof ContactsLayoutContentTableSchema>;

// Contacts New 페이지 타입
export type ContactsFormSection = z.infer<typeof ContactsFormSectionSchema>;
export type ContactsFormInputData = z.infer<typeof ContactsFormDataSchema>;
export type ContactsSubmissionResult = z.infer<typeof ContactsSubmissionResultSchema>;

// =============================================================================
// 컴포넌트 Props 타입
// =============================================================================

// 공통 Props 타입
export interface ContactsHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export interface ContactsHeaderSectionProps {
  data: ContactsHeaderSection;
}

export interface ContactsTableSectionProps {
  data: ContactsLayoutContentTable;
}

export interface ContactsFormSectionProps {
  data: ContactsFormSection;
}

// 유틸리티 타입들
export interface ContactsSectionMap {
  "contacts-header": ContactsHeaderSection;
  "contacts-table": ContactsLayoutContentTable;
  "contacts-form": ContactsFormSection;
}

export type ContactsContentSectionKey = keyof ContactsSectionMap;
export type ContactsContentSection = ContactsSectionMap[ContactsContentSectionKey];

// Contacts New Props 타입
export interface ContactsFormProps {
  formConfig: ContactsFormSection["formConfig"];
}
export interface ContactsPageLayoutRendererProps {
  layoutData: ContactsLayoutContent;
}

// Contacts New Props 타입
export interface ContactsFormProps {
  formConfig: ContactsFormSection["formConfig"];
}
export interface ContactsPageLayoutRendererProps {
  layoutData: ContactsLayoutContent;
}
