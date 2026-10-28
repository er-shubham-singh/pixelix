import { Router } from 'express';
import { getServices, getServiceBySlug, createService } from '../controllers/serviceController.js';

const router = Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);
router.post('/', createService);

export default router;
