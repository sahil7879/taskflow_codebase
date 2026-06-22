import { Router } from 'express';
import { projectController } from '../controllers/ProjectController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res) => projectController.getAll(req, res));
router.get('/:id', (req, res) => projectController.getById(req, res));
router.get('/user/me', authMiddleware, (req, res) => projectController.getByUserId(req, res));
router.post('/', authMiddleware, (req, res) => projectController.create(req, res));
router.put('/:id', authMiddleware, (req, res) => projectController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => projectController.delete(req, res));

export default router;
