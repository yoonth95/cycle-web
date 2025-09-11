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
export function formatDate(dateString: string, isTime: boolean = false): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(
    "ko-KR",
    isTime
      ? {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
      : {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        },
  );
}
