import { z } from "zod";

// =============================================================================
// 공통 스키마
// =============================================================================

const OperatingHoursSchema = z.object({
  time: z.string(),
  label: z.string(),
});

const SeasonalHoursSchema = z.object({
  winter: OperatingHoursSchema,
  summer: OperatingHoursSchema,
});

const ContactInfoShape = {
  address: z.string(),
  officeNumber: z.string(),
  phoneNumber: z.string(),
  seasonalHours: SeasonalHoursSchema,
};

export const ServiceItemSchema = z.object({
  order: z.number(),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  iconName: z.string(),
});

export const BicycleTypeItemSchema = z.object({
  order: z.number(),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  image: z.string(),
});

const StoreInfoItemSchema = z.object({
  order: z.number(),
  iconName: z.string(),
  label: z.string(),
});

// =============================================================================
// 섹션 스키마
// =============================================================================

export const HeroSectionSchema = z.object({
  id: z.number(),
  section: z.literal("hero"),
  title: z.union([z.string(), z.record(z.string(), z.unknown())]),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  mainImage: z.string(),
  badge: z.string(),
  ...ContactInfoShape,
});

export const ServicesSectionSchema = z.object({
  id: z.number(),
  section: z.literal("services"),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  serviceTypes: z.array(ServiceItemSchema),
});

export const BicycleTypesSectionSchema = z.object({
  id: z.number(),
  section: z.literal("bicycleTypes"),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  bicycleTypes: z.array(BicycleTypeItemSchema),
});

export const LocationSectionSchema = z.object({
  id: z.number(),
  section: z.literal("location"),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  storeInfo: z.array(StoreInfoItemSchema),
  lat: z.string(),
  lng: z.string(),
  ...ContactInfoShape,
});

export const SectionSchema = z.discriminatedUnion("section", [
  HeroSectionSchema,
  ServicesSectionSchema,
  BicycleTypesSectionSchema,
  LocationSectionSchema,
]);

// =============================================================================
// DB 관련 스키마 (서버에서만 사용)
// =============================================================================

export const DbPageRowSchema = z.object({
  id: z.string(),
  slug: z.string(),
});

export const DbPageLayoutRowSchema = z.object({
  id: z.string(),
  page_id: z.string(),
  layout: z.unknown(),
});

export const DbPageSectionRowSchema = z.object({
  id: z.string(),
  page_id: z.string(),
  section_type: z.string(),
  data: z.unknown(),
  order_index: z.number().nullable().optional(),
});

export const NormalizationInputSchema = z.object({
  id: z.string(),
  slug: z.string(),
  section: z.string(),
  data: z.unknown(),
  order_index: z.number().nullable().optional(),
});

// =============================================================================
// 레이아웃 스키마
// =============================================================================

export const HomeContentSectionLayoutBaseSchema = z.object({
  id: z.number(),
  section: z.enum(["hero", "services", "bicycleTypes", "location"]),
  order: z.number(),
  className: z.string().optional(),
});

export const HomeContentLayoutSchema = z.object({
  className: z.string().optional(),
  sections: z.array(HomeContentSectionLayoutBaseSchema),
});

export const HomeLayoutDataSchema = z.object({
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: HomeContentLayoutSchema,
  }),
});

export const HomePageContentDataSchema = z.object({
  sections: z.array(SectionSchema),
});

// 기본 타입들
export type OperatingHours = z.infer<typeof OperatingHoursSchema>;
export type SeasonalHours = z.infer<typeof SeasonalHoursSchema>;
export type ContactInfo = {
  address: string;
  officeNumber: string;
  phoneNumber: string;
  seasonalHours: SeasonalHours;
};

// 아이템 타입들
export type ServiceItem = z.infer<typeof ServiceItemSchema>;
export type BicycleTypeItem = z.infer<typeof BicycleTypeItemSchema>;
export type StoreInfoItem = z.infer<typeof StoreInfoItemSchema>;

// 섹션 타입들
export type HeroSectionType = z.infer<typeof HeroSectionSchema>;
export type ServicesSectionType = z.infer<typeof ServicesSectionSchema>;
export type BicycleTypesSectionType = z.infer<typeof BicycleTypesSectionSchema>;
export type LocationSectionType = z.infer<typeof LocationSectionSchema>;

// 레이아웃 타입들
export type HomeContentSectionLayoutBase = z.infer<typeof HomeContentSectionLayoutBaseSchema>;
export type HomeContentLayout = z.infer<typeof HomeContentLayoutSchema>;
export type HomeLayoutData = z.infer<typeof HomeLayoutDataSchema>;
export type HomePageContentData = z.infer<typeof HomePageContentDataSchema>;

// DB 타입들 (서버에서만 사용)
export type DbPageRow = z.infer<typeof DbPageRowSchema>;
export type DbPageLayoutRow = z.infer<typeof DbPageLayoutRowSchema>;
export type DbPageSectionRow = z.infer<typeof DbPageSectionRowSchema>;
export type NormalizationInput = z.infer<typeof NormalizationInputSchema>;

// 컴포넌트 Props 타입들
export interface HeroSectionProps {
  data: HeroSectionType;
}

export interface ServicesSectionProps {
  data: ServicesSectionType;
}

export interface BicycleTypesSectionProps {
  data: BicycleTypesSectionType;
}

export interface LocationSectionProps {
  data: LocationSectionType;
}

// 유틸리티 타입들
export interface SectionMap {
  hero: HeroSectionType;
  services: ServicesSectionType;
  bicycleTypes: BicycleTypesSectionType;
  location: LocationSectionType;
}

export type HomeContentSectionKey = keyof SectionMap;
export type HomeContentSection = SectionMap[HomeContentSectionKey];
