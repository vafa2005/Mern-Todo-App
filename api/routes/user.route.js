import express from 'express';

const app = express();

app.get('/get-all-todo', (req, res) => {
    // To get all todos
});

app.post('/create-new-todo', (req, res) => {
    // To create new todo
});

app.patch('/', (req, res) => {
    // To edit a todo
});

app.delete('/', (req, res) => {
    //To delete a todo
});

export default app;