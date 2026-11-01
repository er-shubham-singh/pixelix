import express from 'express';
import {
  getChatbotConfig,
  handleChatMessage,
  updateChatbotConfig,
} from '../controllers/chatbotController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Endpoints
router.get('/config', getChatbotConfig);
router.post('/message', handleChatMessage);

// Admin Endpoints
router.put('/config', protect, ownerOnly, updateChatbotConfig);

export default router;

