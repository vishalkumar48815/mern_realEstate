import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_img: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzewQ_JGAS5FVP6PWfoTSzZ9TnNJWuMJFfLg&s",
        required: false
    }
},{timestamps:true}) ;

const User = mongoose.model('User', userSchema);

export default User