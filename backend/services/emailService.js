import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

let transporter = null;

// Initialize Transporter
function getTransporter() {
  if (transporter) return transporter;

  if (ENV.SMTP_USER && ENV.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: ENV.SMTP_HOST,
      port: ENV.SMTP_PORT,
      secure: ENV.SMTP_PORT === 465, // true for 465, false for 587
      auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS
      }
    });
  }
  return transporter;
}

/**
 * Send Employee Welcome & Credentials Email
 */
export async function sendEmployeeCredentialsEmail({
  to,
  name,
  email,
  password,
  domain,
  employeeId,
  portalUrl = ENV.EMPLOYEE_URL || 'https://employee.pixelix.co.in'
}) {
  const mailTransporter = getTransporter();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF6EE; margin: 0; padding: 24px; color: #2A2421; }
        .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #EADCC8; box-shadow: 0 10px 25px rgba(200,69,35,0.08); }
        .header { background: linear-gradient(135deg, #C84523, #D9532F); color: #ffffff; padding: 32px 28px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: -0.5px; }
        .header p { margin: 8px 0 0; color: #FDFBF7; font-size: 14px; opacity: 0.9; }
        .content { padding: 32px 28px; }
        .welcome { font-size: 16px; line-height: 1.6; color: #4A403A; }
        .credentials-box { background: #FDFBF7; border: 1px dashed #C84523; border-radius: 12px; padding: 20px; margin: 24px 0; }
        .cred-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F3EAE0; font-size: 14px; }
        .cred-row:last-child { border-bottom: none; }
        .cred-label { color: #8E7A70; font-weight: 500; }
        .cred-val { font-weight: 700; color: #2A2421; font-family: monospace; }
        .cta-btn { display: inline-block; background: #C84523; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 15px; margin: 20px 0 10px; text-align: center; }
        .footer { background: #FAF6EE; padding: 20px 28px; text-align: center; font-size: 12px; color: #8E7A70; border-top: 1px solid #EADCC8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>PIXELIX</h1>
          <p>Creative & Digital Solutions — Employee Portal Access</p>
        </div>
        <div class="content">
          <p class="welcome">Hello <strong>${name}</strong>,</p>
          <p class="welcome">Welcome to the Pixelix team! Your employee account has been created by the administration. You can now log into your employee panel to record daily attendance, submit daily work summaries, and manage leave requests.</p>
          
          <div class="credentials-box">
            <div class="cred-row">
              <span class="cred-label">Employee ID:</span>
              <span class="cred-val">${employeeId || 'Assigned'}</span>
            </div>
            <div class="cred-row">
              <span class="cred-label">Domain / Department:</span>
              <span class="cred-val">${domain}</span>
            </div>
            <div class="cred-row">
              <span class="cred-label">Login Email:</span>
              <span class="cred-val">${email}</span>
            </div>
            <div class="cred-row">
              <span class="cred-label">Temporary Password:</span>
              <span class="cred-val">${password}</span>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="${portalUrl}" class="cta-btn">Access Employee Portal</a>
          </div>

          <p style="font-size: 13px; color: #8E7A70; margin-top: 24px; line-height: 1.5;">
            * Reminder: Daily work summaries must be submitted on the active day. Past day logs are locked automatically when a new date begins.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Pixelix Creative & Digital Systems. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  if (!mailTransporter) {
    console.log(`\n================= [SIMULATED EMAIL DISPATCH] =================`);
    console.log(`To: ${to}`);
    console.log(`Subject: Welcome to Pixelix - Your Portal Login Credentials`);
    console.log(`Employee: ${name} (${domain}) | ID: ${employeeId}`);
    console.log(`Credentials -> Email: ${email} | Password: ${password}`);
    console.log(`Portal URL: ${portalUrl}`);
    console.log(`Configure SMTP_USER & SMTP_PASS in .env to send via real mail server.`);
    console.log(`===============================================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const info = await mailTransporter.sendMail({
      from: ENV.EMAIL_FROM,
      to,
      subject: `Welcome to Pixelix - Your Portal Login Credentials [${domain}]`,
      html
    });
    console.log(`✉️ Credentials email delivered to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Failed to send credentials email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send Leave Application Status (Approved / Rejected) Email
 */
export async function sendLeaveStatusEmail({
  to,
  name,
  status, // 'approved' | 'rejected'
  startDate,
  endDate,
  reason,
  reviewNotes
}) {
  const mailTransporter = getTransporter();
  const isApproved = status.toLowerCase() === 'approved';
  const badgeColor = isApproved ? '#10B981' : '#EF4444';
  const badgeText = isApproved ? 'APPROVED' : 'REJECTED';
  const actionText = isApproved
    ? 'Your leave request has been approved by the management. Your attendance calendar has been marked accordingly.'
    : 'Your leave request has been reviewed and could not be approved at this time.';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF6EE; margin: 0; padding: 24px; color: #2A2421; }
        .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #EADCC8; box-shadow: 0 10px 25px rgba(200,69,35,0.08); }
        .header { background: linear-gradient(135deg, #C84523, #D9532F); color: #ffffff; padding: 32px 28px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 8px 0 0; color: #FDFBF7; font-size: 14px; opacity: 0.9; }
        .content { padding: 32px 28px; }
        .status-badge { display: inline-block; padding: 6px 16px; border-radius: 9999px; font-weight: 700; font-size: 14px; color: #fff; background: ${badgeColor}; }
        .details-box { background: #FDFBF7; border: 1px solid #EADCC8; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F3EAE0; font-size: 14px; }
        .row:last-child { border-bottom: none; }
        .label { color: #8E7A70; font-weight: 500; }
        .val { font-weight: 600; color: #2A2421; }
        .footer { background: #FAF6EE; padding: 20px 28px; text-align: center; font-size: 12px; color: #8E7A70; border-top: 1px solid #EADCC8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>PIXELIX</h1>
          <p>Leave Application Status Update</p>
        </div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          <div style="margin: 16px 0;">
            <span class="status-badge">${badgeText}</span>
          </div>
          <p style="font-size: 15px; line-height: 1.6; color: #4A403A;">
            ${actionText}
          </p>
          
          <div class="details-box">
            <div class="row">
              <span class="label">Date Range:</span>
              <span class="val">${startDate} to ${endDate}</span>
            </div>
            <div class="row">
              <span class="label">Reason Provided:</span>
              <span class="val">${reason}</span>
            </div>
            ${reviewNotes ? `
            <div class="row">
              <span class="label">Management Notes:</span>
              <span class="val">${reviewNotes}</span>
            </div>` : ''}
          </div>

          <p style="font-size: 13px; color: #8E7A70; margin-top: 20px;">
            For any queries or updates, please contact your manager or HR department.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Pixelix Creative & Digital Systems. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  if (!mailTransporter) {
    console.log(`\n================= [SIMULATED LEAVE STATUS EMAIL] =================`);
    console.log(`To: ${to} (${name})`);
    console.log(`Subject: Leave Application Update: ${badgeText}`);
    console.log(`Dates: ${startDate} to ${endDate} | Status: ${badgeText}`);
    console.log(`Notes: ${reviewNotes || 'None'}`);
    console.log(`==================================================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const info = await mailTransporter.sendMail({
      from: ENV.EMAIL_FROM,
      to,
      subject: `Leave Application Status: ${badgeText} [${startDate} - ${endDate}]`,
      html
    });
    console.log(`✉️ Leave notification delivered to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Failed to send leave status email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
}

