import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ENV } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let transporter = null;
let mailStatus = {
  configured: false,
  connected: false,
  user: null,
  service: null,
  lastVerifiedAt: null,
  error: null
};

// Initialize Transporter
function getTransporter() {
  if (transporter) return transporter;

  const user = (ENV.SMTP_USER || '').trim();
  const pass = (ENV.SMTP_PASS || '').trim();

  if (user && pass) {
    if (ENV.SMTP_HOST && ENV.SMTP_HOST.includes('gmail.com')) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user,
          pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    } else {
      transporter = nodemailer.createTransport({
        host: ENV.SMTP_HOST || 'smtp.gmail.com',
        port: Number(ENV.SMTP_PORT) || 587,
        secure: Number(ENV.SMTP_PORT) === 465,
        auth: {
          user,
          pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }
  }
  return transporter;
}

// Find local official logo file for CID embedding in email
function getLogoAttachment() {
  const possiblePaths = [
    path.resolve(__dirname, '../assets/logo.png'),
    path.resolve(__dirname, '../../frontend/public/light-mode-logo.png'),
    path.resolve(__dirname, '../../employee/public/light-mode-logo.png'),
    path.resolve(__dirname, '../../admin/public/light-mode-logo.png')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return {
        filename: 'pixelix-logo.png',
        path: p,
        cid: 'pixelix-logo'
      };
    }
  }
  return null;
}

function getFromAddress() {
  if (ENV.SMTP_HOST && ENV.SMTP_HOST.includes('gmail.com') && ENV.SMTP_USER) {
    return `"Pixelix Creative & Digital Systems" <${ENV.SMTP_USER.trim()}>`;
  }
  if (ENV.EMAIL_FROM && ENV.EMAIL_FROM.trim().length > 0) {
    return ENV.EMAIL_FROM;
  }
  return `"Pixelix Systems" <${ENV.SMTP_USER || 'no-reply@pixelix.co.in'}>`;
}

/**
 * Verify SMTP Connection on Startup & Log Status to Console
 */
export async function verifyMailConnection() {
  const user = (ENV.SMTP_USER || '').trim();
  const pass = (ENV.SMTP_PASS || '').trim();

  mailStatus.configured = Boolean(user && pass);
  mailStatus.user = user ? user.replace(/(.{3}).*(@.*)/, '$1***$2') : null;
  mailStatus.service = ENV.SMTP_HOST && ENV.SMTP_HOST.includes('gmail.com') ? 'gmail' : ENV.SMTP_HOST;

  if (!user || !pass) {
    console.warn(`\n⚠️  [NODEMAILER STATUS]: SMTP credentials (SMTP_USER / SMTP_PASS) not configured in environment.`);
    console.warn(`ℹ️  [NODEMAILER NOTICE]: Pixelix Backend will run in Email Simulation Mode (emails logged to terminal only).\n`);
    mailStatus.connected = false;
    mailStatus.error = 'SMTP credentials not provided';
    return { success: false, status: mailStatus };
  }

  const mailTransporter = getTransporter();
  if (!mailTransporter) {
    mailStatus.connected = false;
    mailStatus.error = 'Failed to create nodemailer transporter';
    return { success: false, status: mailStatus };
  }

  console.log(`\n📡 [NODEMAILER CONNECTING]: Testing SMTP connection to ${ENV.SMTP_HOST || 'smtp.gmail.com'} (${user})...`);

  return new Promise((resolve) => {
    mailTransporter.verify((error, success) => {
      mailStatus.lastVerifiedAt = new Date().toISOString();
      if (error) {
        mailStatus.connected = false;
        mailStatus.error = error.message;
        console.error(`❌ [NODEMAILER CONNECTION FAILED]:`);
        console.error(`   • Error Code: ${error.code || 'UNKNOWN'}`);
        console.error(`   • Message: ${error.message}`);
        if (error.code === 'EAUTH') {
          console.error(`   👉 Hint: Google requires a 16-character App Password (not your normal Gmail password).`);
          console.error(`   👉 Create App Password: https://myaccount.google.com/apppasswords`);
        }
        console.log('');
        resolve({ success: false, error: error.message, status: mailStatus });
      } else {
        mailStatus.connected = true;
        mailStatus.error = null;
        console.log(`✅ [NODEMAILER CONNECTED]: SMTP server verified & active!`);
        console.log(`   • Account: ${user}`);
        console.log(`   • Mode: Live Email Dispatch Ready\n`);
        resolve({ success: true, status: mailStatus });
      }
    });
  });
}

/**
 * Get Live Email Status (for /api/health and admin dashboards)
 */
export function getEmailStatus() {
  return {
    ...mailStatus,
    fullUser: mailStatus.configured ? (ENV.SMTP_USER || '').trim() : null
  };
}

/**
 * Send Employee Welcome & Credentials Email with Official Logo
 */
export async function sendEmployeeCredentialsEmail({
  to,
  name,
  email,
  password,
  domain,
  employeeId,
  employmentType = 'full_time',
  shiftHours = 8,
  portalUrl = ENV.EMPLOYEE_URL || 'https://employee.pixelix.co.in'
}) {
  const mailTransporter = getTransporter();
  const logoAttachment = getLogoAttachment();
  const attachments = logoAttachment ? [logoAttachment] : [];

  const shiftLabel = employmentType === 'part_time'
    ? '4 Hours / Day (Part-Time)'
    : '8 Hours / Day (Full-Time)';

  console.log(`\n================= [NODEMAILER DISPATCH START] =================`);
  console.log(`📨 Initiating Credentials Email:`);
  console.log(`   • Target Recipient: ${to}`);
  console.log(`   • Employee Name: ${name}`);
  console.log(`   • Department: ${domain} | Employee ID: ${employeeId || 'PX-EMP-1001'}`);
  console.log(`   • From Sender: ${getFromAddress()}`);
  console.log(`   • Logo Embedded: ${logoAttachment ? `Yes (${logoAttachment.path})` : 'Fallback Text'}`);
  console.log(`   • Transporter State: ${mailTransporter ? 'Active (Live SMTP)' : 'Unconfigured (Simulation Mode)'}`);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Pixelix - Your Portal Credentials</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #F8F4EE;
          margin: 0;
          padding: 24px 12px;
          color: #2A2421;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #EADCC8;
          box-shadow: 0 12px 30px rgba(200,69,35,0.08);
        }
        .logo-header {
          background: #ffffff;
          padding: 26px 28px;
          text-align: center;
          border-bottom: 2px solid #F3EAE0;
        }
        .brand-banner {
          background: linear-gradient(135deg, #C84523 0%, #D9532F 50%, #B83A1A 100%);
          color: #ffffff;
          padding: 26px 28px;
          text-align: center;
        }
        .brand-banner h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.4px;
          color: #ffffff;
        }
        .brand-banner p {
          margin: 6px 0 0;
          color: #FDFBF7;
          font-size: 13px;
          opacity: 0.95;
        }
        .content {
          padding: 32px 28px;
        }
        .welcome-lead {
          font-size: 15px;
          line-height: 1.65;
          color: #3F3732;
          margin: 0 0 20px;
        }
        .credentials-card {
          background: #FDFBF8;
          border: 1.5px solid #F0DFCE;
          border-radius: 14px;
          padding: 22px 24px;
          margin: 24px 0;
          box-shadow: 0 4px 14px rgba(0,0,0,0.02);
        }
        .cred-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 2px solid #EADCC8;
          margin-bottom: 12px;
        }
        .cred-header-title {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #C84523;
        }
        .cred-badge {
          background: #FEE2E2;
          color: #991B1B;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .cred-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .cred-table td {
          padding: 9px 0;
          border-bottom: 1px solid #F3EAE0;
          vertical-align: middle;
        }
        .cred-table tr:last-child td {
          border-bottom: none;
        }
        .cred-label {
          color: #7A6961;
          font-weight: 600;
          width: 42%;
        }
        .cred-value {
          font-weight: 700;
          color: #2A2421;
        }
        .cred-code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          color: #C84523;
          background: #FFF3EB;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #F5C6B5;
          font-weight: 800;
        }
        .cta-container {
          text-align: center;
          margin: 30px 0 16px;
        }
        .cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, #C84523, #B83A1A);
          color: #ffffff !important;
          text-decoration: none;
          padding: 15px 36px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 15px;
          letter-spacing: 0.2px;
          box-shadow: 0 6px 18px rgba(200,69,35,0.28);
        }
        .guidelines-box {
          background: #F6F4EE;
          border-left: 4px solid #C84523;
          border-radius: 0 10px 10px 0;
          padding: 14px 18px;
          margin: 24px 0 10px;
          font-size: 12px;
          color: #5A4E47;
          line-height: 1.6;
        }
        .guidelines-box ul {
          margin: 6px 0 0;
          padding-left: 18px;
        }
        .guidelines-box li {
          margin-bottom: 4px;
        }
        .signature {
          margin-top: 26px;
          padding-top: 20px;
          border-top: 1px solid #F3EAE0;
          font-size: 13px;
          line-height: 1.6;
          color: #5A4E47;
        }
        .footer {
          background: #FAF6EE;
          padding: 22px 28px;
          text-align: center;
          font-size: 11px;
          color: #8E7A70;
          border-top: 1px solid #EADCC8;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <!-- 1. Official Logo Header -->
        <div class="logo-header">
          ${
            logoAttachment
              ? `<img src="cid:pixelix-logo" alt="Pixelix Logo" style="max-height: 52px; max-width: 230px; height: auto; width: auto; display: inline-block; vertical-align: middle;" />`
              : `<div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; color: #C84523;">PIXELIX</div>`
          }
        </div>

        <!-- 2. Hero Title Banner -->
        <div class="brand-banner">
          <h1>Official Employee Onboarding</h1>
          <p>Pixelix Creative & Digital Systems • Internal Workforce Systems</p>
        </div>

        <!-- 3. Main Content -->
        <div class="content">
          <p class="welcome-lead">Hello <strong>${name}</strong>,</p>
          <p class="welcome-lead">
            Welcome to the <strong>Pixelix</strong> team! Your corporate employee profile has been officially registered and provisioned on our internal systems.
          </p>
          <p class="welcome-lead">
            You can now log into your dedicated <strong>Employee Portal</strong> to track daily attendance, clock in/out, record your daily work deliverables summary, and manage your weekly off and leave requests.
          </p>

          <!-- 4. Credentials Security Box -->
          <div class="credentials-card">
            <div class="cred-header">
              <span class="cred-header-title">🔐 Your Official Portal Credentials</span>
              <span class="cred-badge">Confidential</span>
            </div>

            <table class="cred-table">
              <tr>
                <td class="cred-label">Employee ID:</td>
                <td class="cred-value font-mono">${employeeId || 'PX-EMP-1001'}</td>
              </tr>
              <tr>
                <td class="cred-label">Full Name:</td>
                <td class="cred-value">${name}</td>
              </tr>
              <tr>
                <td class="cred-label">Department / Domain:</td>
                <td class="cred-value">${domain}</td>
              </tr>
              <tr>
                <td class="cred-label">Assigned Shift:</td>
                <td class="cred-value">${shiftLabel}</td>
              </tr>
              <tr>
                <td class="cred-label">Portal Login Email:</td>
                <td class="cred-value"><span class="cred-code">${email}</span></td>
              </tr>
              <tr>
                <td class="cred-label">Temporary Password:</td>
                <td class="cred-value"><span class="cred-code">${password}</span></td>
              </tr>
            </table>
          </div>

          <!-- 5. CTA Button -->
          <div class="cta-container">
            <a href="${portalUrl}" class="cta-btn">
              👉 Log In to Employee Portal
            </a>
            <p style="font-size: 11px; color: #8E7A70; margin-top: 10px;">
              Direct Portal URL: <a href="${portalUrl}" style="color: #C84523; font-weight: 600;">${portalUrl}</a>
            </p>
          </div>

          <!-- 6. Essential Workplace Guidelines -->
          <div class="guidelines-box">
            <strong>📋 Important Workplace & Attendance Guidelines:</strong>
            <ul>
              <li><strong>Daily Punch-In & Checkout:</strong> Remember to clock in each morning upon starting your shift and punch out in the evening with your daily deliverables summary.</li>
              <li><strong>Active-Day Locking Policy:</strong> Work summaries must be logged on the active calendar date. Past unlogged dates are permanently locked.</li>
              <li><strong>7-Day Operations & Weekly Off:</strong> Pixelix operates 7 days a week. You are entitled to <strong>1 flexible leave per week</strong>—apply in advance via the Leave Applications tab to schedule your weekly off.</li>
              <li><strong>Security:</strong> Please keep these credentials confidential and update your password after your first login.</li>
            </ul>
          </div>

          <!-- 7. Corporate Signature -->
          <div class="signature">
            Warm regards,<br>
            <strong>The Executive Management & HR Operations</strong><br>
            Pixelix Creative & Digital Systems<br>
            <span style="font-size: 12px; color: #8E7A70;">
              🌐 <a href="https://pixelix.co.in" style="color: #C84523; text-decoration: none;">https://pixelix.co.in</a> &nbsp;|&nbsp; 📧 contact@pixelix.co.in &nbsp;|&nbsp; 📞 +91 70560 63863
            </span>
          </div>
        </div>

        <!-- 8. Footer -->
        <div class="footer">
          &copy; ${new Date().getFullYear()} Pixelix Creative & Digital Systems. All rights reserved.<br>
          This is an automated administrative notification dispatched to provision corporate credentials.
        </div>
      </div>
    </body>
    </html>
  `;

  if (!mailTransporter) {
    console.log(`⚠️  [NODEMAILER SIMULATION]: Transporter not active. Email simulated:`);
    console.log(`    Credentials -> Email: ${email} | Password: ${password}`);
    console.log(`    Portal URL: ${portalUrl}`);
    console.log(`=================================================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const info = await mailTransporter.sendMail({
      from: getFromAddress(),
      replyTo: 'contact@pixelix.co.in',
      to,
      subject: `Welcome to Pixelix - Your Portal Login Credentials [${domain}]`,
      html,
      attachments
    });

    console.log(`✅ [NODEMAILER DISPATCH SUCCESS]:`);
    console.log(`   • Recipient: ${to}`);
    console.log(`   • Message ID: ${info.messageId}`);
    console.log(`   • Response: ${info.response || '250 OK'}`);
    console.log(`   • Accepted: ${JSON.stringify(info.accepted || [to])}`);
    console.log(`=================================================================\n`);
    return { success: true, messageId: info.messageId, response: info.response };
  } catch (error) {
    console.error(`❌ [NODEMAILER DISPATCH ERROR]:`);
    console.error(`   • Failed Recipient: ${to}`);
    console.error(`   • Error Code: ${error.code || 'UNKNOWN'}`);
    console.error(`   • Message: ${error.message}`);
    console.error(`=================================================================\n`);
    return { success: false, error: error.message, code: error.code };
  }
}

/**
 * Send Leave Application Status (Approved / Rejected) Email with Official Logo
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
  const logoAttachment = getLogoAttachment();
  const attachments = logoAttachment ? [logoAttachment] : [];

  const isApproved = status.toLowerCase() === 'approved';
  const badgeColor = isApproved ? '#10B981' : '#EF4444';
  const badgeText = isApproved ? 'APPROVED' : 'REJECTED';
  const actionText = isApproved
    ? 'Your leave request has been officially approved by management. Your attendance calendar has been marked accordingly.'
    : 'Your leave request has been reviewed and could not be approved at this time.';

  console.log(`\n================= [NODEMAILER LEAVE STATUS START] =================`);
  console.log(`📨 Initiating Leave Status Email:`);
  console.log(`   • Recipient: ${to} (${name})`);
  console.log(`   • Decision: ${badgeText}`);
  console.log(`   • Duration: ${startDate} to ${endDate}`);
  console.log(`   • Transporter: ${mailTransporter ? 'Active (Live SMTP)' : 'Simulation Mode'}`);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Leave Application Update</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #F8F4EE;
          margin: 0;
          padding: 24px 12px;
          color: #2A2421;
        }
        .wrapper {
          max-width: 580px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #EADCC8;
          box-shadow: 0 10px 25px rgba(200,69,35,0.08);
        }
        .logo-header {
          background: #ffffff;
          padding: 22px 28px;
          text-align: center;
          border-bottom: 2px solid #F3EAE0;
        }
        .header {
          background: linear-gradient(135deg, #C84523, #D9532F);
          color: #ffffff;
          padding: 24px 28px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
        }
        .header p {
          margin: 6px 0 0;
          color: #FDFBF7;
          font-size: 13px;
          opacity: 0.95;
        }
        .content {
          padding: 28px;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 18px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 13px;
          color: #ffffff;
          background: ${badgeColor};
          letter-spacing: 0.5px;
        }
        .details-box {
          background: #FDFBF8;
          border: 1.5px solid #EADCC8;
          border-radius: 12px;
          padding: 18px 20px;
          margin: 20px 0;
        }
        .row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #F3EAE0;
          font-size: 13px;
        }
        .row:last-child {
          border-bottom: none;
        }
        .label {
          color: #7A6961;
          font-weight: 600;
        }
        .val {
          font-weight: 700;
          color: #2A2421;
        }
        .footer {
          background: #FAF6EE;
          padding: 20px 28px;
          text-align: center;
          font-size: 11px;
          color: #8E7A70;
          border-top: 1px solid #EADCC8;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="logo-header">
          ${
            logoAttachment
              ? `<img src="cid:pixelix-logo" alt="Pixelix Logo" style="max-height: 48px; max-width: 220px; height: auto; width: auto; display: inline-block;" />`
              : `<div style="font-size: 24px; font-weight: 900; color: #C84523;">PIXELIX</div>`
          }
        </div>
        <div class="header">
          <h1>Leave Application Status Update</h1>
          <p>Pixelix Creative & Digital Systems • Internal HR Review</p>
        </div>
        <div class="content">
          <p style="font-size: 15px; margin: 0 0 16px;">Hello <strong>${name}</strong>,</p>
          <div style="margin: 16px 0;">
            <span class="status-badge">${badgeText}</span>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: #4A403A;">
            ${actionText}
          </p>
          
          <div class="details-box">
            <div class="row">
              <span class="label">Date Range:</span>
              <span class="val font-mono">${startDate} to ${endDate}</span>
            </div>
            <div class="row">
              <span class="label">Reason Provided:</span>
              <span class="val">${reason}</span>
            </div>
            ${
              reviewNotes
                ? `
            <div class="row">
              <span class="label">Management Feedback:</span>
              <span class="val">${reviewNotes}</span>
            </div>`
                : ''
            }
          </div>

          <p style="font-size: 12px; color: #8E7A70; margin-top: 20px; line-height: 1.5;">
            You can view your updated calendar anytime in the <a href="${ENV.EMPLOYEE_URL || 'https://employee.pixelix.co.in'}" style="color: #C84523; font-weight: 600;">Pixelix Employee Portal</a>.
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
    console.log(`⚠️  [NODEMAILER SIMULATION]: Transporter not active. Simulated status: ${badgeText}`);
    console.log(`====================================================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const info = await mailTransporter.sendMail({
      from: getFromAddress(),
      replyTo: 'contact@pixelix.co.in',
      to,
      subject: `Leave Application Status: ${badgeText} [${startDate} - ${endDate}]`,
      html,
      attachments
    });
    console.log(`✅ [NODEMAILER DISPATCH SUCCESS]:`);
    console.log(`   • Recipient: ${to}`);
    console.log(`   • Message ID: ${info.messageId}`);
    console.log(`   • Response: ${info.response || '250 OK'}`);
    console.log(`====================================================================\n`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ [NODEMAILER DISPATCH ERROR]:`);
    console.error(`   • Failed Recipient: ${to}`);
    console.error(`   • Error: ${error.message}`);
    console.error(`====================================================================\n`);
    return { success: false, error: error.message };
  }
}

/**
 * Send Test Email & Log Real-time Results to Console
 */
export async function sendTestEmail(targetEmail) {
  const mailTransporter = getTransporter();
  const recipient = targetEmail || ENV.SMTP_USER;
  const logoAttachment = getLogoAttachment();
  const attachments = logoAttachment ? [logoAttachment] : [];

  console.log(`\n================= [NODEMAILER TEST START] =================`);
  console.log(`🧪 Dispatching Test Ping to: ${recipient}`);

  if (!mailTransporter) {
    console.error(`❌ [NODEMAILER TEST FAILED]: Transporter not configured. Missing SMTP_USER or SMTP_PASS.`);
    console.log(`===========================================================\n`);
    return { success: false, error: 'SMTP transporter not initialized' };
  }

  try {
    const info = await mailTransporter.sendMail({
      from: getFromAddress(),
      replyTo: 'contact@pixelix.co.in',
      to: recipient,
      subject: 'Pixelix Nodemailer Test — SMTP Gateway Verified',
      html: `
        <div style="font-family: sans-serif; padding: 24px; background: #FAF6EE; color: #2A2421;">
          <div style="max-width: 500px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 14px; border: 1px solid #EADCC8; text-align: center;">
            <div style="margin-bottom: 16px;">
              ${logoAttachment ? '<img src="cid:pixelix-logo" alt="Pixelix Logo" style="max-height: 44px;" />' : '<h2 style="color: #C84523;">PIXELIX</h2>'}
            </div>
            <h3 style="color: #10B981; margin: 0 0 10px;">✅ Nodemailer Connection Verified</h3>
            <p style="font-size: 14px; color: #5A4E47; line-height: 1.6;">
              Your Nodemailer configuration is active and successfully delivering emails through Google SMTP.
            </p>
            <p style="font-size: 12px; color: #8E7A70; margin-top: 16px;">
              Timestamp: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      attachments
    });

    console.log(`✅ [NODEMAILER TEST SUCCESS]:`);
    console.log(`   • Recipient: ${recipient}`);
    console.log(`   • Message ID: ${info.messageId}`);
    console.log(`   • Response: ${info.response || '250 OK'}`);
    console.log(`===========================================================\n`);
    return { success: true, messageId: info.messageId, response: info.response };
  } catch (err) {
    console.error(`❌ [NODEMAILER TEST FAILED]:`);
    console.error(`   • Error Code: ${err.code || 'UNKNOWN'}`);
    console.error(`   • Message: ${err.message}`);
    console.log(`===========================================================\n`);
    return { success: false, error: err.message, code: err.code };
  }
}
