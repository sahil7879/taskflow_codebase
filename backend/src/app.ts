import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { errorHandler } from './middleware/authMiddleware';

import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
