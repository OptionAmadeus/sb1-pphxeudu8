import { Router } from 'express';
import { joinWaitlist } from '../controllers/waitlist.js';

const router = Router();

router.post('/', joinWaitlist);

export { router as waitlistRouter };