import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/auth.js';
import { createUser, findUserByEmail } from '../models/user.js';
import { AUTH_CONFIG } from '../config/auth.js';
import { logger } from '../utils/logger.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    // Return user data and token
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    logger.error('Login failed:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}

export async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await createUser({ email, password, name });

    // Generate token
    const token = generateToken(user);

    // Return user data and token
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    logger.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
}