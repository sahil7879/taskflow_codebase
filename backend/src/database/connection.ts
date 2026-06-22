import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'taskflow',
  password: process.env.DB_PASSWORD || 'taskflow',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'taskflow',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
