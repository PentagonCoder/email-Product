import { Router } from 'express';

const router = Router();

import { searchController, getBuyersEmails } from '../controllers/buyer.controller.js';

// Get scraped data endpoint
router.get('/search', searchController);
router.get('/emails', getBuyersEmails);

export default router;