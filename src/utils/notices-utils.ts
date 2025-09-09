/**
 * 공지사항 관련 유틸리티 함수들
 */

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

/**
 * 조회수를 포맷합니다 (1000 이상은 k 단위로 표시)
 */
export function formatViewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

/**
 * 새로운 공지사항인지 확인합니다 (3일 이내)
 */
export function isNewNotice(createdAt: string): boolean {
  const created = new Date(createdAt);
  const now = new Date();
  const diffInDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 3; // 3일 이내면 NEW 표시
}

/**
 * 공지사항이 수정되었는지 확인합니다 (1분 이상 차이)
 */
export function isUpdatedNotice(createdAt: string, updatedAt: string): boolean {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  return updated.getTime() > created.getTime() + 60000; // 1분 이상 차이가 나면 수정됨
}

/**
 * 페이지네이션을 위한 페이지 번호 배열을 생성합니다
 */
export function generatePaginationNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 10,
): number[] {
  const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}
