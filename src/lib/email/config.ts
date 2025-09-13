import "server-only";

// 환경변수에서 이메일 설정 가져오기
export const EMAIL_CONFIG = {
  smtp: {
    service: "naver",
    host: process.env.EMAIL_HOST || "smtp.naver.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    auth: {
      user: process.env.ADMIN_EMAIL || "", // Naver 주소
      pass: process.env.ADMIN_PASS || "", // Naver 애플리케이션 비밀번호
    },
  },
  // 발신자 정보
  from: {
    name: "삼천리 자전거 중동역점",
    address: process.env.ADMIN_EMAIL || "test@example.com",
  },
  // 관리자 이메일 (문의사항 접수 알림을 받을 이메일)
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    name: "관리자",
  },
};

// 이메일 설정이 제대로 되어있는지 확인
export function validateEmailConfig(): boolean {
  return !!(EMAIL_CONFIG.smtp.auth.user && EMAIL_CONFIG.smtp.auth.pass && EMAIL_CONFIG.admin.email);
}
