import express from 'express' ;
import mongoose from 'mongoose' ;
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js' ;
import authRouter from './routes/auth.route.js' ;
import errorHandlerMiddleware from './middlewares/error.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log("Connected to MongoDB!")
})
.catch((err) =>{
    console.log("Could not connect to the MongoDB - Error:- " + err)
})

let app = express();
const port = 5000 ;

app.use(express.json()) ;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

app.use('/api/user', userRoute) ;
app.use('/api/auth', authRouter) ;


// middleware for errors 
app.use(errorHandlerMiddleware)