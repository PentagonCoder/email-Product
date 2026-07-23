import { Router } from 'express';
const router = Router();

import { searchController, sendPresentationController } from '../controllers/buyer.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

// Get scraped data endpoint
router.post('/search', searchController);
router.post('/emails', upload.single("presentation"), sendPresentationController);

export default router;