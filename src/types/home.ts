type OperatingHoursType = {
  time: string;
  label: string;
};

type SeasonalHoursType = {
  winter: OperatingHoursType;
  summer: OperatingHoursType;
};

type ContactInfoType = {
  address: string;
  officeNumber: string;
  phoneNumber: string;
  seasonalHours: SeasonalHoursType;
};

export type HeroSectionType = {
  id: number;
  section: "hero";
  order: number;
  title: string;
  subTitle: string;
  description: string;
  mainImage: string;
  badge: string;
} & ContactInfoType;

export type ServicesSectionType = {
  id: number;
  section: "services";
  order: number;
  title: string;
  description: string;
  serviceTypes: {
    order: number;
    title: string;
    description: string;
    iconName: string;
  }[];
};

export type BicycleTypesSectionType = {
  id: number;
  section: "bicycleTypes";
  order: number;
  title: string;
  description: string;
  bicycleTypes: {
    order: number;
    title: string;
    description: string;
    image: string;
  }[];
};

export type LocationSectionType = {
  id: number;
  section: "location";
  order: number;
  title: string;
  description: string;
  storeInfo: {
    order: number;
    iconName: string;
    label: string;
  }[];
  lat: string;
  lng: string;
} & ContactInfoType;

export type SectionMap = {
  hero: HeroSectionType;
  services: ServicesSectionType;
  bicycleTypes: BicycleTypesSectionType;
  location: LocationSectionType;
};

// 컴포넌트 Props 타입
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
