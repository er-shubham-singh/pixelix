import express from 'express';
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getAllLeaves,
  updateLeaveStatus,
  getDailyAttendanceOversight,
  getCompanyAnalytics,
  getSiteInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/ownerController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Owner only barrier
router.use(protect, ownerOnly);

// Employee Management
router.post('/employees', createEmployee);
router.get('/employees', getEmployees);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

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

export default router;

