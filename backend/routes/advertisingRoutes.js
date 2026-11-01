import express from 'express';
import {
  getAdvertisingServices,
  getAdvertisingServiceById,
  createAdvertisingService,
  updateAdvertisingService,
  deleteAdvertisingService,
} from '../controllers/advertisingController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Endpoints
router.get('/services', getAdvertisingServices);
router.get('/services/:id', getAdvertisingServiceById);

// Admin Endpoints
router.post('/services', protect, ownerOnly, createAdvertisingService);
router.put('/services/:id', protect, ownerOnly, updateAdvertisingService);
router.delete('/services/:id', protect, ownerOnly, deleteAdvertisingService);

export default router;

