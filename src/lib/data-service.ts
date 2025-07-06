import { getIconComponent } from "@/utils/icon-mapping";
import type {
  HomePageData,
  HomePageApiResponse,
  SessionConfig,
  HeroSectionData,
  ServicesSectionData,
  BicycleTypesSectionData,
  LocationSectionData,
  BicycleType,
} from "@/types";

// --- 데이터베이스 시뮬레이션 ---
let activeCustomizations: SessionConfig["customizations"] | null = null;
// ---

// 시스템 고정 데이터 (관리자가 변경할 수 없는 기본 설정)
const SYSTEM_DEFAULTS = {
  storeInfo: {
    officeNumber: "032-326-3002",
    phoneNumber: "010-3112-9310",
    location: "부천시 원미구 부일로 303",
    address: "부천시 원미구 부일로 303",
    phoneNumbers: ["032-326-3002", "010-3112-9310"],
    hours: {
      winter: {
        time: "10:30-18:30",
        label: "동절기(12월-2월)",
      },
      summer: {
        time: "09:30-20:00",
        label: "하절기(3월-11월)",
      },
    },
  },
  defaultAmenities: [
    { iconName: "calendar", label: "예약" },
    { iconName: "car", label: "배달" },
    { iconName: "wifi", label: "무선 인터넷" },
    { iconName: "phone", label: "남녀 화장실 구분" },
  ],
};

// 기본 커스터마이징 데이터 (관리자가 변경 가능한 기본값)
const DEFAULT_CUSTOMIZATIONS: SessionConfig["customizations"] = {
  hero: {
    badge: "부천 중동 대표 자전거 전문점",
    title: "삼천리 자전거",
    subTitle: "중동역점",
    description:
      "부천 중동 북부역 상동시장입구 대로변에서 20년간 운영해온 신뢰할 수 있는 자전거 전문점입니다.",
    mainImage: "/main-image.png",
  },
  services: {
    title: "전문 서비스",
    description:
      "창업 이후 지속적인 A/S로 보답하겠습니다. 전문적인 수리와 정비 서비스를 제공합니다.",
    serviceTypes: [
      {
        title: "전문 수리",
        description: "모든 종류의 자전거 수리 및 정비 서비스를 제공합니다.",
        iconName: "wrench",
      },
      {
        title: "무료 배달",
        description: "인천 근교 가까운 곳은 무료로 배달해드립니다.",
        iconName: "truck",
      },
      {
        title: "지속적인 A/S",
        description: "창업 이후 지속적인 애프터서비스로 보답하겠습니다.",
        iconName: "headphones",
      },
    ],
  },
  bicycleTypes: {
    title: "자전거 종류",
    description: "모든 종류의 자전거를 판매하고 있습니다.",
    bicycleTypes: [
      {
        title: "전기자전거",
        description: "전기모터의 힘을 더하여 적은 힘으로도 편하게 주행할 수 있는 자전거",
        image: "/bike.png",
      },
      {
        title: "로드",
        description: "빠른 속도와 효율적인 주행을 위한 자전거",
        image: "/bike.png",
      },
      {
        title: "하이브리드",
        description: "도시와 자연을 모두 누릴 수 있는 다목적 자전거",
        image: "/bike.png",
      },
      {
        title: "픽시",
        description: "심플하고 스타일리시한 고정기어 자전거",
        image: "/bike.png",
      },
      {
        title: "컴포트 산악형",
        description: "편안한 승차감의 산악 자전거",
        image: "/bike.png",
      },
      {
        title: "시티",
        description: "도심 주행에 최적화된 편리한 자전거",
        image: "/bike.png",
      },
      {
        title: "폴딩",
        description: "휴대성이 뛰어난 접이식 자전거",
        image: "/bike.png",
      },
      {
        title: "키즈",
        description: "아이들을 위한 안전하고 재미있는 자전거",
        image: "/bike.png",
      },
      {
        title: "주니어",
        description: "청소년을 위한 성장기 맞춤 자전거",
        image: "/bike.png",
      },
    ],
  },
  location: {
    title: "오시는길",
    description:
      "도보시 중동북부역 2번출구 건너편, 중동사거리 상동시장 입구 방향으로 오시면 됩니다.",
  },
};

/**
 * 활성화된 홈페이지 데이터를 가져오는 함수 (이전의 fetchHomePageData)
 */
async function fetchActiveHomePageData(): Promise<HomePageApiResponse> {
  const customizations = await getActiveCustomizations();

  return {
    storeInfo: SYSTEM_DEFAULTS.storeInfo,
    customizations,
  };
}

/**
 * 활성화된 커스터마이징 데이터 가져오기 (이전의 getSessionCustomizations)
 */
async function getActiveCustomizations(): Promise<SessionConfig["customizations"]> {
  // 실제 환경에서는 DB에서 isActive: true인 설정을 가져옵니다.
  // 시뮬레이션 환경에서는 메모리에 저장된 값을 사용합니다.
  if (activeCustomizations) {
    return activeCustomizations;
  }
  return DEFAULT_CUSTOMIZATIONS;
}

/**
 * 커스터마이징 설정 저장 (이전의 saveSessionCustomizations)
 */
export async function saveCustomizations(
  customizations: SessionConfig["customizations"],
): Promise<Partial<SessionConfig>> {
  // 실제 환경에서는 DB에 저장/업데이트
  activeCustomizations = customizations;
  console.log("새로운 설정이 활성화되었습니다:", activeCustomizations);

  // 시뮬레이션이므로 간단한 ID 반환
  return { id: `config_${Date.now()}`, customizations };
}

/**
 * 활성 설정 삭제 (이전의 deleteSessionCustomizations)
 */
export async function deleteCustomizations(): Promise<void> {
  // 실제 환경에서는 DB에서 해당 설정을 삭제하거나 비활성화합니다.
  activeCustomizations = null;
  console.log("활성 설정이 삭제되었습니다. 기본값으로 복원됩니다.");
}

/**
 * API 응답을 각 섹션별 데이터로 변환
 */
export function transformToSectionData(apiResponse: HomePageApiResponse): HomePageData {
  const { storeInfo, customizations } = apiResponse;

  return {
    hero: buildHeroSectionData(storeInfo, customizations.hero),
    services: buildServicesSectionData(customizations.services),
    bicycleTypes: buildBicycleTypesSectionData(customizations.bicycleTypes),
    location: buildLocationSectionData(storeInfo, customizations.location),
  };
}

/**
 * 히어로 섹션 데이터 생성
 */
function buildHeroSectionData(
  storeInfo: HomePageApiResponse["storeInfo"],
  customizations: SessionConfig["customizations"]["hero"],
): HeroSectionData {
  const defaults = DEFAULT_CUSTOMIZATIONS.hero;

  return {
    mainImage: (customizations.mainImage ?? defaults.mainImage) as string,
    badge: (customizations.badge ?? defaults.badge) as string,
    title: (customizations.title ?? defaults.title) as string,
    subTitle: (customizations.subTitle ?? defaults.subTitle) as string,
    description: (customizations.description ?? defaults.description) as string,
    officeNumber: storeInfo.officeNumber,
    phoneNumber: storeInfo.phoneNumber,
    location: storeInfo.location,
    hours: storeInfo.hours,
  };
}

/**
 * 서비스 섹션 데이터 생성
 */
function buildServicesSectionData(
  customizations: SessionConfig["customizations"]["services"],
): ServicesSectionData {
  const defaults = DEFAULT_CUSTOMIZATIONS.services;

  return {
    title: (customizations.title ?? defaults.title) as string,
    description: (customizations.description ?? defaults.description) as string,
    serviceTypes: (customizations.serviceTypes ?? defaults.serviceTypes ?? []).map((service) => ({
      icon: getIconComponent(service.iconName),
      title: service.title,
      description: service.description,
    })),
  };
}

/**
 * 자전거 종류 섹션 데이터 생성
 */
function buildBicycleTypesSectionData(
  customizations: SessionConfig["customizations"]["bicycleTypes"],
): BicycleTypesSectionData {
  const defaults = DEFAULT_CUSTOMIZATIONS.bicycleTypes;

  return {
    title: (customizations.title ?? defaults.title) as string,
    description: (customizations.description ?? defaults.description) as string,
    bicycleTypes: (customizations.bicycleTypes ?? defaults.bicycleTypes) as BicycleType[],
  };
}

/**
 * 위치 섹션 데이터 생성
 */
function buildLocationSectionData(
  storeInfo: HomePageApiResponse["storeInfo"],
  customizations: SessionConfig["customizations"]["location"],
): LocationSectionData {
  const defaults = DEFAULT_CUSTOMIZATIONS.location;

  return {
    title: (customizations.title ?? defaults.title) as string,
    description: (customizations.description ?? defaults.description) as string,
    address: storeInfo.address,
    phoneNumbers: storeInfo.phoneNumbers,
    hours: storeInfo.hours,
    amenities: SYSTEM_DEFAULTS.defaultAmenities.map((amenity) => ({
      iconName: amenity.iconName,
      label: amenity.label,
    })),
  };
}

/**
 * 홈페이지 데이터 가져오기 (통합 함수)
 */
export async function getHomePageData(): Promise<HomePageData> {
  const apiResponse = await fetchActiveHomePageData();
  return transformToSectionData(apiResponse);
}
