/**
 * 태그 색상을 반환합니다
 */
export function getTagColor(color: string) {
  const colorMap: Record<string, string> = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    gray: "bg-gray-500",
  };
  return colorMap[color] || "bg-gray-500";
}

/**
 * 날짜를 한국어 형식으로 포맷합니다
 */
export function formatDate(
  dateString: string,
  isTime: boolean = false,
  ampm: boolean = false, // ← 추가: true면 '오전/오후' 12시간제
): string {
  const date = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  };

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    ...dateOptions,
    hour: "2-digit",
    minute: "2-digit",
    hour12: ampm, // ← 여기만 플래그로 제어
  };

  return isTime
    ? date.toLocaleString("ko-KR", dateTimeOptions) // ampm=true면 '오전/오후 HH:MM'
    : date.toLocaleDateString("ko-KR", dateOptions); // 날짜만
}
/**
 * 새로운 글인지 확인합니다 (3일 이내)
 */
export function isNewArticle(createdAt: string): boolean {
  const created = new Date(createdAt);
  const now = new Date();
  const diffInDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 3; // 3일 이내면 NEW 표시
}

/**
 * 글이 수정되었는지 확인합니다 (1분 이상 차이)
 */
export function isUpdatedArticle(createdAt: string, updatedAt: string): boolean {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  return updated.getTime() > created.getTime() + 60000; // 1분 이상 차이가 나면 수정됨
}
