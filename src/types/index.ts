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
