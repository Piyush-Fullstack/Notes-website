const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask,getTasksById } = require('../controllers/taskControllers');
const {authMiddleware} = require('../middlewares/authMiddlewares');

router.post('/create', authMiddleware, createTask);
router.get('/all', authMiddleware, getTasks);
router.put('/update/:id', authMiddleware, updateTask);
router.delete('/delete/:id', authMiddleware, deleteTask);
router.get('/:id', authMiddleware, getTasksById);

module.exports = router;