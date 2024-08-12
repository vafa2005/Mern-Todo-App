import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/user.route.js"

const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDb Connected!');
})

app.use('/api', userRoute);