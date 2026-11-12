import express from 'express';
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  resendEmployeeCredentials,
  getAllLeaves,
  updateLeaveStatus,
  getDailyAttendanceOversight,
  getCompanyAnalytics,
  getSiteInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/ownerController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';
import { verifyMailConnection, sendTestEmail, getEmailStatus } from '../services/emailService.js';

const router = express.Router();

// Owner only barrier
router.use(protect, ownerOnly);

// Employee Management
router.post('/employees', createEmployee);
router.get('/employees', getEmployees);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);
router.post('/employees/:id/resend-credentials', resendEmployeeCredentials);

// Leave Approval Management
router.get('/leaves', getAllLeaves);
router.put('/leaves/:id/status', updateLeaveStatus);

// Attendance Daily Oversight
router.get('/attendance/daily', getDailyAttendanceOversight);

// Comprehensive Analytics & Circular Graph Metrics
router.get('/analytics', getCompanyAnalytics);

// Website Control (Inquiries & Services)
router.get('/site/inquiries', getSiteInquiries);
router.put('/site/inquiries/:id', updateInquiryStatus);
router.delete('/site/inquiries/:id', deleteInquiry);

// Nodemailer SMTP Status & Dispatch Verification
router.get('/email/status', async (req, res) => {
  const result = await verifyMailConnection();
  return res.json({ success: true, ...result });
});

router.post('/email/test', async (req, res) => {
  const { to } = req.body;
  const result = await sendTestEmail(to || req.user.email);
  return res.json(result);
});

export default router;

