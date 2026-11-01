import express from 'express';
import {
  submitLead,
  getLeads,
  updateLeadStatus,
  addLeadNote,
  deleteLead,
  exportLeadsCSV,
} from '../controllers/leadController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Lead Capture
router.post('/', submitLead);

// Admin Lead Management
router.get('/', protect, ownerOnly, getLeads);
router.get('/export/csv', protect, ownerOnly, exportLeadsCSV);
router.put('/:id/status', protect, ownerOnly, updateLeadStatus);
router.post('/:id/notes', protect, ownerOnly, addLeadNote);
router.delete('/:id', protect, ownerOnly, deleteLead);

export default router;

