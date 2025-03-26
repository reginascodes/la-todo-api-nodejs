// Helper function for assinging indexing
function fixIndexing() {
    tasks = tasks.map((task, index) => {
        task.order = index + 1;
        return task;
    });
}

// In-memory array for tasks and ID
let tasks = [];
let nextId = tasks.length + 1

exports.getTasks = (req, res) => {
    try {
        res.status(200).json({ data: tasks });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
};

exports.createTask = (req, res) => {
    try {
        const task = req.body;
        task.id = nextId;
        task.order = tasks.length+1;
    
        tasks.push(task);
        nextId++;
    
        res.status(201).json({ message: 'Task created successfully!', data: task });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateTask = (req, res) => {
    try {
        const id = req.params.id;
        const task = req.body;
        const taskIndex = tasks.findIndex(task => task.id == id);

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }


        tasks[taskIndex] = task;
        res.status(201).json({ message: 'Task updated successfully!', data: task });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

exports.deleteTask = (req, res) => {
    try {
        const id = req.params.id;
        const task = req.body;
        tasks = tasks.filter(task => task.id != id);
        fixIndexing();
        res.status(201).json({ message: 'Task deleted successfully!', data: task });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
}

exports.moveTask = (req, res) => {
    try{
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
        fixIndexing();
    
        res.status(201).json({ message: 'Task moved successfully!', data: tasks });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}