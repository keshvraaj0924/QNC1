import nodemailer from 'nodemailer';

/**
 * Enterprise Mail Service
 * Handles SMTP transport and templating for QNC notifications.
 */
class MailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  async init() {
    // In a real enterprise app, these would be in .env
    const config = {
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // For demonstration, we create a test account if no real credentials exist
    if (!config.auth.user) {
      console.log('⚠️ MailService: No SMTP credentials found. Using Ethereal (Development Mode).');
      try {
        const testAccount = await nodemailer.createTestAccount();
        config.host = 'smtp.ethereal.email';
        config.port = 587;
        config.secure = false;
        config.auth = {
          user: testAccount.user,
          pass: testAccount.pass,
        };
      } catch (err) {
        console.error('❌ MailService: Failed to create test account:', err);
      }
    }

    this.transporter = nodemailer.createTransport(config);
  }

  /**
   * Sends a structured email notification.
   */
  async sendEmail({ to, subject, text, html, attachments = [] }) {
    if (!this.transporter) await this.init();

    try {
      const info = await this.transporter.sendMail({
        from: `"QNC Platform" <${process.env.SMTP_FROM || 'noreply@qudratnational.com'}>`,
        to,
        subject,
        text,
        html,
        attachments
      });

      console.log('✅ Email sent: %s', info.messageId);
      // If using Ethereal, log the preview URL
      if (nodemailer.getTestMessageUrl(info)) {
        console.log('🔗 Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
      return info;
    } catch (err) {
      console.error('❌ MailService: Error sending email:', err);
      throw err;
    }
  }
}

export default new MailService();
