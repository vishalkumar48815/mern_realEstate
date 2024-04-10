import express from 'express' ;
import mongoose from 'mongoose' ;
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js' ;

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


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

app.use('/api/user', userRoute) ;