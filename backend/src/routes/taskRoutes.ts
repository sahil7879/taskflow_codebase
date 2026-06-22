import { Router } from 'express';
import { taskController } from '../controllers/TaskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res) => taskController.getAll(req, res));
router.get('/stats/dashboard', (req, res) => taskController.getDashboardStats(req, res));
router.get('/:id', (req, res) => taskController.getById(req, res));
router.get('/project/:projectId', (req, res) => taskController.getByProjectId(req, res));
router.post('/', authMiddleware, (req, res) => taskController.create(req, res));
router.put('/:id', authMiddleware, (req, res) => taskController.update(req, res));
router.put('/:id/status', authMiddleware, (req, res) => taskController.updateStatus(req, res));
router.delete('/:id', authMiddleware, (req, res) => taskController.delete(req, res));

export default router;
