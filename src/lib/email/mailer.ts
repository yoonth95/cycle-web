import "server-only";

// 타입만 import하여 런타임에 nodemailer가 없어도 에러가 발생하지 않도록 함
import type { Transporter } from "nodemailer";
import type { ContactFormData } from "@/types/contact";
import { EMAIL_CONFIG, validateEmailConfig } from "./config";
import { getAdminNotificationTemplate, getUserConfirmationTemplate } from "./templates";

let transporter: Transporter | null = null;

/**
 * Nodemailer 트랜스포터 초기화
 */
async function getTransporter(): Promise<Transporter | null> {
  try {
    // 이메일 설정 검증
    if (!validateEmailConfig()) {
      console.warn("[Email] 이메일 설정이 구성되지 않았습니다. 메일 전송을 건너뜁니다.");
      return null;
    }

    // nodemailer 동적 import
    const nodemailer = await import("nodemailer");

    if (!transporter) {
      transporter = nodemailer.createTransport(EMAIL_CONFIG.smtp);

      // 연결 테스트
      await transporter.verify();
      console.log("[Email] SMTP 서버 연결 성공");
    }

    return transporter;
  } catch (error) {
    console.error("[Email] SMTP 설정 오류:", error);
    return null;
  }
}

/**
 * 관리자에게 새로운 문의사항 알림 메일 전송
 */
export async function sendAdminNotification(contactData: ContactFormData): Promise<boolean> {
  try {
    const transporter = await getTransporter();
    if (!transporter) return false;

    const template = getAdminNotificationTemplate(contactData);

    await transporter.sendMail({
      from: `"${EMAIL_CONFIG.from.name}" <${EMAIL_CONFIG.from.address}>`,
      to: EMAIL_CONFIG.admin.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    console.log("[Email] 관리자 알림 메일 전송 완료:", EMAIL_CONFIG.admin.email);
    return true;
  } catch (error) {
    console.error("[Email] 관리자 알림 메일 전송 실패:", error);
    return false;
  }
}

/**
 * 사용자에게 문의사항 접수 확인 메일 전송
 */
export async function sendUserConfirmation(contactData: ContactFormData): Promise<boolean> {
  try {
    const transporter = await getTransporter();
    if (!transporter) return false;

    const template = getUserConfirmationTemplate(contactData);

    await transporter.sendMail({
      from: `"${EMAIL_CONFIG.from.name}" <${EMAIL_CONFIG.from.address}>`,
      to: contactData.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    console.log("[Email] 사용자 확인 메일 전송 완료:", contactData.email);
    return true;
  } catch (error) {
    console.error("[Email] 사용자 확인 메일 전송 실패:", error);
    return false;
  }
}

/**
 * 관리자 알림과 사용자 확인 메일을 동시에 전송
 */
export async function sendContactEmails(contactData: ContactFormData): Promise<{
  adminSent: boolean;
  userSent: boolean;
}> {
  const [adminSent, userSent] = await Promise.allSettled([
    sendAdminNotification(contactData),
    sendUserConfirmation(contactData),
  ]);

  return {
    adminSent: adminSent.status === "fulfilled" ? adminSent.value : false,
    userSent: userSent.status === "fulfilled" ? userSent.value : false,
  };
}
