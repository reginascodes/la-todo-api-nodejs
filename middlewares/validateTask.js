// Middleware to validate task data before creating a task
function validateTask(req, res, next) {
    const { title, description, status, order } = req.body;

    // Check if the title is provided
    if (!title) {
        return res.status(400).json({
            message: "Title is required."
        });
    }

    // Validate status value
    const validStatuses = ['Done', 'Pending'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: 'Status must be either "Done" or "Pending".'
        });
    }

   
    if (order && typeof order !== 'number') {
        return res.status(400).json({
            message: "Order must be a number if provided."
        });
    }
    
    next();
}

module.exports = validateTask;  // Export the middleware
