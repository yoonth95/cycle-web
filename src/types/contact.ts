import { z } from "zod";

// =============================================================================
// DB 스키마 - Raw 데이터 타입
// =============================================================================

export const DbContactRowSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  name: z.string(),
  email: z.string().email(),
  created_at: z.string(),
});

// =============================================================================
// Contact 폼 데이터 타입
// =============================================================================

export const ContactFormDataSchema = z.object({
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
  name: z
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
});

// 최종 폼 데이터 타입 (email 필드 포함)
export type ContactFormData = z.infer<typeof ContactFormDataSchema> & {
  email: string;
};

export const ContactSubmissionResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.string().optional(),
});

// =============================================================================
// 레이아웃 데이터 타입
// =============================================================================

export const ContactHeaderSectionSchema = z.object({
  id: z.number(),
  order: z.number(),
  title: z.string(),
  section: z.literal("contact-header"),
  className: z.string(),
  description: z.union([
    z.string(),
    z.object({
      ops: z.array(z.record(z.string(), z.unknown())),
    }),
  ]),
});

export const ContactFormSectionSchema = z.object({
  id: z.number(),
  order: z.number(),
  section: z.literal("contact-form"),
  className: z.string(),
  formConfig: z.object({
    titlePlaceholder: z.string(),
    descriptionPlaceholder: z.string(),
    namePlaceholder: z.string(),
    emailPlaceholder: z.string(),
    submitButtonText: z.string(),
    successMessage: z.string(),
    errorMessage: z.string(),
  }),
});

export const ContactLayoutContentSchema = z.object({
  sections: z.array(z.union([ContactHeaderSectionSchema, ContactFormSectionSchema])),
  className: z.string(),
});

export const ContactLayoutSchema = z.object({
  type: z.literal("contact-page"),
  content: ContactLayoutContentSchema,
  className: z.string(),
});

export const ContactLayoutDataSchema = z.object({
  layout: ContactLayoutSchema,
});

// =============================================================================
// 타입 추출
// =============================================================================

export type DbContactRow = z.infer<typeof DbContactRowSchema>;
export type ContactFormInputData = z.infer<typeof ContactFormDataSchema>; // 입력용 타입
export type ContactSubmissionResult = z.infer<typeof ContactSubmissionResultSchema>;
export type ContactHeaderSection = z.infer<typeof ContactHeaderSectionSchema>;
export type ContactFormSection = z.infer<typeof ContactFormSectionSchema>;
export type ContactLayoutContent = z.infer<typeof ContactLayoutContentSchema>;
export type ContactLayout = z.infer<typeof ContactLayoutSchema>;
export type ContactLayoutData = z.infer<typeof ContactLayoutDataSchema>;

// =============================================================================
// 컴포넌트 Props 타입
// =============================================================================

export interface ContactFormProps {
  formConfig: ContactFormSection["formConfig"];
}

export interface ContactHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export interface ContactPageLayoutRendererProps {
  layoutData: ContactLayoutContent;
}
