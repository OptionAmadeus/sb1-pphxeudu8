import jwt from 'jsonwebtoken';
import { AUTH_CONFIG } from '../config/auth.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, AUTH_CONFIG.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
}

export function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id,
      email: user.email
    },
    AUTH_CONFIG.jwt.secret,
    { 
      expiresIn: AUTH_CONFIG.jwt.expiresIn,
      algorithm: AUTH_CONFIG.jwt.algorithm
    }
  );
}