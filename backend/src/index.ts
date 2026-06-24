import app from './app';
import * as dotenv from 'dotenv';
import pool from './database/connection';
import { initializeDatabase } from './database/init';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  await initializeDatabase(pool);

  app.listen(PORT, () => {
    console.log(`TaskFlow API listening on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
