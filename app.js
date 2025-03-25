const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory array for tasks
let tasks = [
    { id: 1, title: 'Task 1', description: 'Lorem Ipsum 1', status: 'Pending', order: 1 },
    { id: 2, title: 'Task 2', description: 'Lorem Ipsum 2', status: 'Done', order: 2 },
];

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});

function validateTask(req, res, next) {
    const {title, description, status, order} = req.body

    if (!title) {
        return res.status(400).json({
            message: "Title is required."
        });
    }

    const validStatuses = ['Done', 'Pending'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: 'Status must be either "Done" or "Pending".'
        });
    }

    next();
      
}

// GET tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// CREATE task
app.post('/tasks', validateTask, (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task);
});

// UPDATE task
app.put('/tasks/:id', validateTask, (req, res) => {
    const id = req.params.id;
    const task = req.body;
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks[taskIndex] = task;
    res.json(task);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id != id);
    res.json({ id });
});

// REORDER tasks
// Call this endpoint everytime a task is moved
// Request body contains the task id and the new order
app.post('/tasks/move', (req, res) => {
    const { id, order } = req.body;

    // Find the task and get its index
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    // Remove the task from the array
    // Returns array with the removed task
    const taskToBeMoved = tasks.splice(taskIndex, 1);

    // Insert the task at the new order
    tasks.splice(order - 1, 0, taskToBeMoved[0]);

    // Reorder the tasks
    tasks = tasks.map((task, index) => {
        task.order = index + 1;
        return task;
    });

    res.json(tasks);
});

app.get('/status', (req, res) => {
    const status = {
        status: 'Running'
    };
    
    res.json(status);
});
