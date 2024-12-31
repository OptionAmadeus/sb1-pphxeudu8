import { logger } from '../utils/logger.js';
import { addToWaitlist, getWaitlistPosition } from '../models/waitlist.js';

export async function joinWaitlist(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        message: 'Name and email are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }

    const id = await addToWaitlist(name, email);
    const position = await getWaitlistPosition(id);

    logger.info('New waitlist entry:', { name, email, position });

    res.status(201).json({
      message: 'Successfully joined the waitlist',
      position
    });
  } catch (error) {
    if (error.code === '23505') { // PostgreSQL unique constraint violation
      return res.status(409).json({
        message: 'This email is already on the waitlist'
      });
    }
    logger.error('Failed to add to waitlist:', error);
    next(error);
  }
}