import { Router } from 'express';
import { getPortfolioData, getTransactionHistory } from '../controllers/portfolio.js';

const router = Router();

router.get('/', getPortfolioData);
router.get('/transactions', getTransactionHistory);

export { router as portfolioRouter };