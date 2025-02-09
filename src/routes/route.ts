import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskbyId,
} from '../controllers/taskController';

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/:id',getTaskbyId)

export default router;
