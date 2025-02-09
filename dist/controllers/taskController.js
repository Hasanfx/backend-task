"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskbyId = exports.deleteTask = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Incoming request body:", req.body);
        const { title, description, priority, dueDate } = req.body;
        // Ensure all necessary fields are provided
        if (!title || !description || !priority) {
            console.error("Missing required fields");
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        // Convert dueDate to Date object if it's provided
        let parsedDueDate = null;
        if (dueDate) {
            parsedDueDate = new Date(dueDate); // Parse the dueDate string
            if (isNaN(parsedDueDate.getTime())) {
                console.error("Invalid dueDate format");
                res.status(400).json({ error: 'Invalid dueDate format' });
                return;
            }
        }
        // Create task with the status defaulting to "pending"
        const task = yield prisma.task.create({
            data: {
                title,
                description,
                priority,
                dueDate: parsedDueDate,
                status: "PENDING"
            },
        });
        console.log("Task created:", task);
        res.status(201).json(task);
    }
    catch (error) {
        console.error("Error creating task:", error); // Log the error
        res.status(500).json({ error: 'Error creating task' });
    }
});
exports.createTask = createTask;
// Get all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        console.log('Fetched tasks:', tasks.length); // Add logging
        res.json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error); // Detailed logging
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});
exports.getAllTasks = getAllTasks;
// Update a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get the task ID from the URL
    const { title, description, priority, dueDate, status } = req.body; // Get updated data from request body (no status here)
    try {
        // Ensure dueDate is in the correct format (as a Date object)
        const formattedDueDate = dueDate ? new Date(dueDate) : null;
        console.log('Updating task with ID:', id); // Log the task ID
        console.log('Updated data:', { title, description, priority, formattedDueDate }); // Log the data to update
        // Update task in the database (status is not updated)
        const updatedTask = yield prisma.task.update({
            where: { id: String(id) }, // Find task by ID
            data: {
                title,
                description,
                priority,
                status,
                dueDate: formattedDueDate, // Pass the Date object here
            },
        });
        // Return the updated task as response
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error('Error during task update:', error); // Log error
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.updateTask = updateTask;
// Delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.task.delete({ where: { id } });
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});
exports.deleteTask = deleteTask;
const getTaskbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield prisma.task.findUnique({ where: { id } });
        if (task) {
            res.json(task); // Send the task data as the response
        }
        else {
            res.status(404).json({ message: 'Task not found' }); // Return 404 if task is not found
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error getting task' });
    }
});
exports.getTaskbyId = getTaskbyId;
