// backend/controllers/contact.controller.js
import nodemailer from 'nodemailer';

export const sendContactMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Jharkhand Tourism" <${process.env.GMAIL_USER}>`,
      to: "arvindkumar18320@gmail.com", // Your email
      replyTo: email,
      subject: subject || "New Contact Message - Jharkhand Tourism",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; }
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
                  <div>${subject || 'General Inquiry'}</div>
                </div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message:</div>
                <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #FF6B35;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Jharkhand Tourism</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Optional: Send auto-reply to user
    const autoReplyTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await autoReplyTransporter.sendMail({
      from: `"Jharkhand Tourism" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Jharkhand Tourism",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: #1B4D3E; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>🌿 Jharkhand Tourism</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Hello ${name},</h2>
            <p>Thank you for reaching out to us! We have received your message and will get back to you within 24-48 hours.</p>
            <p>Your query has been noted and our team will assist you shortly.</p>
            <p>In the meantime, feel free to explore our website for more information about the beautiful destinations in Jharkhand.</p>
            <hr>
            <p style="font-size: 14px;">Warm regards,<br><strong>Jharkhand Tourism Team</strong></p>
          </div>
          <div class="footer" style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Jharkhand Tourism</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};