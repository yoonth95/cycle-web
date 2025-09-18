/**
 * 공지사항 관련 유틸리티 함수들
 */

/**
 * 조회수를 포맷합니다 (1000 이상은 k 단위로 표시)
 */
export function formatViewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}
