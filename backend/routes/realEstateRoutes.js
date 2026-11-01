import express from 'express';
import {
  getCalculatorConfig,
  calculateEstimate,
  updateCalculatorConfig,
  getShowcases,
  getShowcaseById,
  createShowcase,
  updateShowcase,
  deleteShowcase,
} from '../controllers/realEstateController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Calculator Public Endpoints
router.get('/calculator/config', getCalculatorConfig);
router.post('/calculator/calculate', calculateEstimate);

// Calculator Admin Endpoints
router.put('/calculator/config', protect, ownerOnly, updateCalculatorConfig);

// 3D Property Showcases Public Endpoints
router.get('/showcases', getShowcases);
router.get('/showcases/:id', getShowcaseById);

// 3D Property Showcases Admin Endpoints
router.post('/showcases', protect, ownerOnly, createShowcase);
router.put('/showcases/:id', protect, ownerOnly, updateShowcase);
router.delete('/showcases/:id', protect, ownerOnly, deleteShowcase);

export default router;

