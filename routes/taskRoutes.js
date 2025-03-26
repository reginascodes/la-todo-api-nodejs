const express = require('express');
const taskController = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');

const router = express.Router();

// GET all tasks
router.get('/', taskController.getTasks);

// CREATE a new task
router.post('/', validateTask, taskController.createTask);

// UPDATE a task
router.put('/:id', validateTask, taskController.updateTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

// REORDER tasks
router.post('/move', taskController.moveTask);

module.exports = router;
