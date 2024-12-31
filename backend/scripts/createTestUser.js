import bcrypt from 'bcrypt';
import pkg from 'pg';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function createTestUser() {
  const testUser = {
    email: 'test@example.com',
    password: 'Test123!',
    name: 'Test User'
  };

  const client = await pool.connect();
  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(testUser.password, 12);
    const userId = uuidv4();

    // Insert the test user
    const result = await client.query(
      `INSERT INTO users (id, email, password_hash, name) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, name, created_at`,
      [userId, testUser.email.toLowerCase(), passwordHash, testUser.name]
    );

    console.log('Test user created successfully:', {
      ...result.rows[0],
      password: testUser.password // Show the plain password for testing
    });
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      console.log('Test user already exists');
    } else {
      console.error('Error creating test user:', error);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

createTestUser().catch(console.error);