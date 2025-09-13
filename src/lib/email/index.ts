// Email functions
export { sendAdminNotification, sendUserConfirmation, sendContactEmails } from "./mailer";

// Email config
export { EMAIL_CONFIG, validateEmailConfig } from "./config";

// Email templates
export { getAdminNotificationTemplate, getUserConfirmationTemplate } from "./templates";
