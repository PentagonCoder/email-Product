import { Router } from 'express';

const router = Router();

import { getScrapedData, searchController } from '../controllers/buyer.controller.js';

// Get scraped data endpoint
router.get('/search', searchController);

export default router;