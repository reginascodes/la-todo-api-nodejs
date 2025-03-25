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

// GET tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// CREATE task
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task);
});

// UPDATE task
app.put('/tasks/:id', (req, res) => {
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

app.get('/status', (req, res) => {
    const status = {
        status: 'Running'
    };
    
    res.json(status);
});
