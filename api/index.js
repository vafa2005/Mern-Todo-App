import express from 'express';
import userRoute from "./routes/user.route.js"

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use('/user', userRoute);