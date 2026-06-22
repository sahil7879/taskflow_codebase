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

const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
  CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
  CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
`;

const seedData = `
  INSERT INTO users (username, email, password) VALUES
    ('demo', 'demo@taskflow.local', '$2b$10$2PiNGGbeBt2BhAxxuIPkEOK5uMYGEaB6EXDNwaEzaEvvO2pxD0Cvu')
  ON CONFLICT (username) DO NOTHING;

  INSERT INTO projects (name, description, user_id) VALUES
    ('Website Redesign', 'Redesign the company website', (SELECT id FROM users WHERE username = 'demo')),
    ('Mobile App', 'Build a mobile app for iOS and Android', (SELECT id FROM users WHERE username = 'demo')),
    ('API Improvements', 'Enhance API performance and reliability', (SELECT id FROM users WHERE username = 'demo'))
  ON CONFLICT DO NOTHING;

  INSERT INTO tasks (project_id, title, description, status) VALUES
    ((SELECT id FROM projects WHERE name = 'Website Redesign'), 'Create wireframes', 'Design wireframes for new layout', 'done'),
    ((SELECT id FROM projects WHERE name = 'Website Redesign'), 'Implement homepage', 'Build homepage component', 'in_progress'),
    ((SELECT id FROM projects WHERE name = 'Website Redesign'), 'Add navigation', 'Implement navigation menu', 'todo'),
    ((SELECT id FROM projects WHERE name = 'Mobile App'), 'Setup project', 'Initialize React Native project', 'done'),
    ((SELECT id FROM projects WHERE name = 'Mobile App'), 'Design UI mockups', 'Create UI mockups in Figma', 'in_progress'),
    ((SELECT id FROM projects WHERE name = 'Mobile App'), 'Implement auth screen', 'Build authentication flow', 'todo'),
    ((SELECT id FROM projects WHERE name = 'API Improvements'), 'Optimize queries', 'Add database indexes', 'done'),
    ((SELECT id FROM projects WHERE name = 'API Improvements'), 'Add caching', 'Implement Redis caching', 'in_progress'),
    ((SELECT id FROM projects WHERE name = 'API Improvements'), 'Write documentation', 'Document API endpoints', 'todo')
  ON CONFLICT DO NOTHING;
`;

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    await pool.query(schema);
    console.log('Schema created successfully');

    await pool.query(seedData);
    console.log('Seed data inserted successfully');

    console.log('Database initialization complete');
    await pool.end();
  } catch (error) {
    console.error('Database initialization failed:', error);
    await pool.end();
    process.exit(1);
  }
}

initializeDatabase();
