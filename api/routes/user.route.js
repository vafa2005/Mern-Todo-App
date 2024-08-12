import express from 'express';
import Todo from '../models/todo.model.js'

const app = express();

app.get('/get-all-todo', async (req, res) => {
    // To get all todos
    try {
        const allTodo = await Todo.find().sort({ updatedAt: -1 });;
        res.json({ todos: allTodo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create new to-do
app.post('/create-new-todo', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const newTodo = new Todo({ title });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update to-do by ID
app.patch('/update-todo/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;
        const updates = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, updates, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'To-Do not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete to-do by ID
app.delete('/delete-todo/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'To-Do not found' });
        }

        res.json({ message: 'To-Do deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default app;