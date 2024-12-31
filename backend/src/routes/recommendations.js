import { Router } from 'express';
import { getRecommendations } from '../controllers/recommendations.js';

const router = Router();

router.get('/', getRecommendations);

export { router as recommendationsRouter };