import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import errorHandlerMiddleware from './middlewares/error.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO) 
    .then(() => {
        console.log("Connected to MongoDB!")
    })
    .catch((err) => {
        console.log("Could not connect to the MongoDB - Error:- " + err)
    })

let app = express();
const port = 5000;

app.use(express.json());

app.use(cookieParser()) ;

// Allow requests from localhost:3000 (your React frontend)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
    
}));


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// middleware for errors 
app.use(errorHandlerMiddleware)