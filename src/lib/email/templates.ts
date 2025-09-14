import type { ContactsFormData } from "@/types/contact";

/**
 * 관리자에게 보낼 메일 템플릿 (새로운 문의사항 알림)
 */
export function getAdminNotificationTemplate(contactData: ContactsFormData) {
  const subject = `[문의사항] ${contactData.title}`;

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>새로운 문의사항</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🚲 새로운 문의사항이 접수되었습니다</h1>
        </div>

        <div style="padding: 30px;">
          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #374151; margin-bottom: 5px;">제목 : ${contactData.title}</div>
          </div>

          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #374151; margin-bottom: 5px;">문의 내용</div>
            <div style="background-color: #f9fafb; padding: 10px; border-radius: 4px; border-left: 4px solid #2563eb; white-space: pre-wrap; line-height: 1.6;">${contactData.description}</div>
          </div>

          <br />
          <br />

          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #374151; margin-bottom: 5px;">문의자 : ${contactData.name}</div>
          </div>

          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #374151; margin-bottom: 5px;">이메일 : ${contactData.email}</div>
          </div>
        </div>

        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p style="margin: 0;">삼천리 자전거 중동역점 | 문의사항 자동 알림 시스템</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
새로운 문의사항이 접수되었습니다.

제목: ${contactData.title}
문의자: ${contactData.name}
이메일: ${contactData.email}

문의 내용:
${contactData.description}

---
삼천리 자전거 중동역점
  `;

  return { subject, html, text };
}

/**
 * 사용자에게 보낼 메일 템플릿 (문의사항 접수 확인)
 */
export function getUserConfirmationTemplate(contactData: ContactsFormData) {
  const subject = `[삼천리 자전거] 문의사항이 접수되었습니다 - ${contactData.title}`;

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>문의사항 접수 완료</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🚲 문의사항이 정상적으로 접수되었습니다</h1>
        </div>

        <br />

        <div style="padding: 30px;">
          <p style="margin: 0 0 10px 0;">안녕하세요, <strong>${contactData.name}</strong>님!</p>
          <p style="margin: 0 0 10px 0;">삼천리 자전거 중동역점에 문의해 주셔서 감사합니다.</p>
          <p style="margin: 0 0 20px 0;">문의사항이 정상적으로 접수되었으며 빠른 시일 내에 검토 후 답변드리겠습니다.</p>

          <br />
          <br />

          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #374151; margin-bottom: 5px;">제목 : ${contactData.title}</div>
          </div>

          <br />

          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #374151; margin-bottom: 5px;">문의 내용</div>
            <div style="background-color: #f0f9ff; padding: 10px; border-radius: 4px; border-left: 4px solid #059669; white-space: pre-wrap; line-height: 1.6;">${contactData.description}</div>
          </div>

          <br />
          <br />

          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">🏪 매장 정보</h3>
            <p style="margin: 0 0 5px 0;"><strong>삼천리 자전거 중동역점</strong></p>
            <p style="margin: 0 0 5px 0;">📞 문의 전화: 032-326-3002</p>
            <p style="margin: 0 0 5px 0;">📍 주소: 부천시 원미구 부일로 303</p>
            <p style="margin: 0 0 5px 0;">🕒 영업시간:</p>
            <div style="">
              <p style="margin: 0 0 5px 0;">동절기(12월~2월) : 10:30 ~ 18:30</p>
              <p style="margin: 0 0 5px 0;">하절기(3월~11월) : 09:30 ~ 20:00</p>
            </div>
          </div>
        </div>

        <br />

        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p style="margin: 0 0 5px 0;">삼천리 자전거 중동역점 | 이 메일은 발신전용입니다.</p>
          <p style="margin: 0;">추가 문의사항이 있으시면 매장으로 직접 연락해 주세요.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
안녕하세요, ${contactData.name}님!

삼천리 자전거 중동역점에 문의해 주셔서 감사합니다.
문의사항이 정상적으로 접수되었으며, 빠른 시일 내에 검토 후 답변드리겠습니다.

접수된 문의사항:
제목: ${contactData.title}
문의 내용: ${contactData.description}

매장 정보:
삼천리 자전거 중동역점
문의 전화: 032-123-4567
영업시간: 평일 10:00~19:00, 주말 10:00~18:00
주소: 경기도 부천시 중동

---
이 메일은 발신전용입니다. 추가 문의사항이 있으시면 매장으로 직접 연락해 주세요.
  `;

  return { subject, html, text };
}
