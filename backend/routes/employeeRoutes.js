import express from 'express';
import {
  submitDailyWorkLog,
  getTodayLog,
  getMonthlyAttendance,
  applyLeave,
  getMyLeaves,
  clockIn,
  clockOut
} from '../controllers/employeeController.js';
import { protect, employeeOrOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth protection to all employee routes
router.use(protect, employeeOrOwner);

router.post('/clock-in', clockIn);
router.post('/clock-out', clockOut);
router.post('/work-log', submitDailyWorkLog);
router.get('/work-log/today', getTodayLog);
router.get('/attendance', getMonthlyAttendance);
router.post('/leaves', applyLeave);
router.get('/leaves', getMyLeaves);

export default router;

