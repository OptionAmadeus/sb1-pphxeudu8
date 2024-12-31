import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function createWaitlistTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'pending'
      );
    `);
  } finally {
    client.release();
  }
}

export async function addToWaitlist(name, email) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO waitlist (name, email) VALUES ($1, $2) RETURNING id',
      [name, email]
    );
    return result.rows[0].id;
  } finally {
    client.release();
  }
}

export async function getWaitlistPosition(id) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT COUNT(*) FROM waitlist WHERE id <= $1',
      [id]
    );
    return parseInt(result.rows[0].count);
  } finally {
    client.release();
  }
}