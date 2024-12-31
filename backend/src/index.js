import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import { errorHandler } from './middleware/error.js';
import { portfolioRouter } from './routes/portfolio.js';
import { recommendationsRouter } from './routes/recommendations.js';
import { waitlistRouter } from './routes/waitlist.js';
import { logger } from './utils/logger.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
app.use(rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
}));

// Logging
app.use(morgan('combined'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/portfolio', portfolioRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/waitlist', waitlistRouter);

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  logger.info(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});