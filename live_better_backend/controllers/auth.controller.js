import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = password && bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save();
        res.status(201).json('User has been added successfully');

    } catch (error) {
        next(error);
    }
}



export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log("req", req)
    try {
        const validUser = await User.findOne({ email }).lean();
        if (!validUser) { return req.next(errorHandler(404, "User not found!")) }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) { return req.next(errorHandler(401, "Wrong credentials!")) }
        const jwtToken = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
        const { password: pass, ...userInfo } = validUser;
        res.cookie('accesstoken', jwtToken, { httpOnly: true }).status(200).json({...userInfo,  success:true})
    }
    catch (err) {
        next(err);
    }
}