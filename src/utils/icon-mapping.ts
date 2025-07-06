import {
  Wrench,
  Truck,
  HeadphonesIcon,
  Calendar,
  Car,
  Wifi,
  Phone,
  MapPin,
  Clock,
  Navigation,
  Map,
  CircleQuestionMark,
  type LucideIcon,
} from "lucide-react";

// 아이콘 매핑 객체
const iconMap: Record<string, LucideIcon> = {
  // 서비스 아이콘
  wrench: Wrench,
  truck: Truck,
  headphones: HeadphonesIcon,

  // 편의시설 아이콘
  calendar: Calendar,
  car: Car,
  wifi: Wifi,
  phone: Phone,

  // 위치 관련 아이콘
  mapPin: MapPin,
  clock: Clock,
  navigation: Navigation,
  map: Map,
  questionMark: CircleQuestionMark,
};

/**
 * 문자열 아이콘 이름을 LucideIcon 컴포넌트로 변환
 */
export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Wrench; // 기본 아이콘
}

/**
 * 사용 가능한 아이콘 목록 반환
 */
export function getAvailableIcons(): Array<{ name: string; icon: LucideIcon }> {
  return Object.entries(iconMap).map(([name, icon]) => ({
    name,
    icon,
  }));
}

/**
 * 아이콘 이름 검증
 */
export function isValidIconName(iconName: string): boolean {
  return iconName in iconMap;
}
