// backend/services/email.service.js
import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    // Configure Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // App Password (not regular password)
      }
    });
  }

  async sendContactEmail(contactData) {
    const { name, email, subject, message } = contactData;
    
    const mailOptions = {
      from: `"Jharkhand Tourism Contact" <${process.env.EMAIL_USER}>`,
      to: 'arvindkumar18320@gmail.com', // Your email
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1B4D3E; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: #e8f3ef; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1B4D3E; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌿 New Contact Form Submission</h1>
              <p>Jharkhand Tourism</p>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div>${name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div>${email}</div>
                </div>
                <div class="field">
                  <div class="label">📋 Subject:</div>
                  <div>${subject}</div>
                </div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message:</div>
                <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #FF6B35;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <p style="margin-top: 20px; font-size: 14px; color: #666;">
                This message was sent from the Jharkhand Tourism contact form.
                <br>You can reply directly to this email to respond to ${name}.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Jharkhand Tourism. All rights reserved.</p>
              <p>This is an automated notification from your website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        
        ---
        This message was sent from the Jharkhand Tourism contact form.
        You can reply to this email to respond to ${name} at ${email}.
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Contact email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw error;
    }
  }

  // Optional: Send auto-reply to user
  async sendAutoReply(contactData) {
    const { name, email } = contactData;
    
    const autoReplyOptions = {
      from: `"Jharkhand Tourism" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Jharkhand Tourism',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background: #1B4D3E; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌿 Jharkhand Tourism</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for reaching out to us! We have received your message and will get back to you within 24-48 hours.</p>
              <p>Your query has been noted and our team will assist you shortly.</p>
              <p>In the meantime, feel free to explore our website for more information about the beautiful destinations in Jharkhand.</p>
              <hr>
              <p style="font-size: 14px;">Warm regards,<br><strong>Jharkhand Tourism Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Jharkhand Tourism</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await this.transporter.sendMail(autoReplyOptions);
      console.log('✅ Auto-reply sent to:', email);
    } catch (error) {
      console.error('❌ Auto-reply failed:', error);
    }
  }
}

export default new EmailService();