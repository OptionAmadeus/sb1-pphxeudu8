import pkg from 'pg';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const SALT_ROUNDS = 12;

export async function createUserTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP WITH TIME ZONE,
        status VARCHAR(50) DEFAULT 'active',
        failed_login_attempts INTEGER DEFAULT 0,
        reset_token VARCHAR(255),
        reset_token_expires TIMESTAMP WITH TIME ZONE
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
  } finally {
    client.release();
  }
}

export async function createUser({ email, password, name }) {
  const client = await pool.connect();
  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = uuidv4();

    const result = await client.query(
      `INSERT INTO users (id, email, password_hash, name) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, name, created_at`,
      [userId, email.toLowerCase(), passwordHash, name]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function verifyUser(email, password) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1 AND status = $2',
      [email.toLowerCase(), 'active']
    );

    const user = result.rows[0];
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      await client.query(
        'UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE id = $1',
        [user.id]
      );
      return null;
    }

    // Reset failed attempts and update last login
    await client.query(
      `UPDATE users 
       SET failed_login_attempts = 0, 
           last_login = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [user.id]
    );

    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } finally {
    client.release();
  }
}

export async function initiatePasswordReset(email) {
  const client = await pool.connect();
  try {
    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await client.query(
      `UPDATE users 
       SET reset_token = $1, 
           reset_token_expires = $2 
       WHERE email = $3`,
      [resetToken, expiresAt, email.toLowerCase()]
    );

    return resetToken;
  } finally {
    client.release();
  }
}

export async function resetPassword(resetToken, newPassword) {
  const client = await pool.connect();
  try {
    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    const result = await client.query(
      `UPDATE users 
       SET password_hash = $1,
           reset_token = NULL,
           reset_token_expires = NULL,
           updated_at = CURRENT_TIMESTAMP
       WHERE reset_token = $2 
         AND reset_token_expires > CURRENT_TIMESTAMP
       RETURNING id`,
      [passwordHash, resetToken]
    );

    return result.rows[0] ? true : false;
  } finally {
    client.release();
  }
}