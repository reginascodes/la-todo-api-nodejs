const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');  // Import task routes

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});

// Routes
app.use('/tasks', taskRoutes);  // Use the task routes

app.get('/status', (req, res) => {
    const status = {
        status: 'Running'
    };
    
    res.json(status);
});
