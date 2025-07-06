import { LucideIcon } from "lucide-react";

// 공통 타입 정의
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  mobile: string;
  address: string;
}

// 기본 공통 타입
export type Season = "winter" | "summer";

export interface OperatingHours {
  time: string;
  label: string;
}

export interface SeasonalHours {
  winter: OperatingHours;
  summer: OperatingHours;
}

// 히어로 섹션 타입
export interface HeroSectionData {
  mainImage: string;
  badge: string;
  title: string;
  subTitle: string;
  description: string;
  officeNumber: string;
  phoneNumber: string;
  location: string;
  hours: SeasonalHours;
}

// 서비스 섹션 타입
export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServicesSectionData {
  title: string;
  description: string;
  serviceTypes: ServiceItem[];
}

// 자전거 종류 섹션 타입
export interface BicycleType {
  title: string;
  description: string;
  image: string;
}

export interface BicycleTypesSectionData {
  title: string;
  description: string;
  bicycleTypes: BicycleType[];
}

// 위치 섹션 타입
export interface LocationSectionData {
  title: string;
  description: string;
  address: string;
  phoneNumbers: string[];
  hours: SeasonalHours;
  amenities: Array<{
    iconName: string;
    label: string;
  }>;
}

// 전체 페이지 데이터 타입
export interface HomePageData {
  hero: HeroSectionData;
  services: ServicesSectionData;
  bicycleTypes: BicycleTypesSectionData;
  location: LocationSectionData;
}

// 관리자 설정 가능 필드 타입 (커스터마이징 가능한 필드들)
export interface CustomizableHeroData {
  badge: string;
  title: string;
  subTitle: string;
  description: string;
  mainImage: string;
}

export interface CustomizableServiceData {
  title: string;
  description: string;
  serviceTypes: Array<{
    title: string;
    description: string;
    iconName: string; // 아이콘은 문자열로 전달받아서 매핑
  }>;
}

export interface CustomizableBicycleTypesData {
  title: string;
  description: string;
  bicycleTypes: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

export interface CustomizableLocationData {
  title: string;
  description: string;
}

// 세션별 커스터마이징 설정 타입
export interface SessionConfig {
  id: string;
  name: string;
  isActive: boolean;
  customizations: {
    hero: Partial<CustomizableHeroData>;
    services: Partial<CustomizableServiceData>;
    bicycleTypes: Partial<CustomizableBicycleTypesData>;
    location: Partial<CustomizableLocationData>;
  };
  createdAt: Date;
  updatedAt: Date;
}

// API 응답 타입
export interface HomePageApiResponse {
  storeInfo: {
    officeNumber: string;
    phoneNumber: string;
    location: string;
    hours: SeasonalHours;
    address: string;
    phoneNumbers: string[];
  };
  customizations: SessionConfig["customizations"];
  sessionId?: string;
}

// 컴포넌트 Props 타입
export interface HeroSectionProps {
  data: HeroSectionData;
}

export interface ServicesSectionProps {
  data: ServicesSectionData;
}

export interface BicycleTypesSectionProps {
  data: BicycleTypesSectionData;
}

export interface LocationSectionProps {
  data: LocationSectionData;
}
