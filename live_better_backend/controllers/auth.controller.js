import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = password && bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword })
    // console.log("newUser: ", newUser)
    try {
        await newUser.save();
        res.status(201).json('User has been added successfully');

    } catch (error) {
        console.log("error: ", error)
        next(error);
    }
}



export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log("req", req)
    try {
        const validUser = await User.findOne({ email }).lean();
         if (!validUser) {
            return res.status(404).json({ success: false, error: "User not found!" });
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, error: "Wrong credentials!" });
        }
        const jwtToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        const { password: pass, ...userInfo } = validUser._doc;
        res.cookie('accessToken', jwtToken, { httpOnly: true }).status(200).json({...userInfo,  success:true})
    }
    catch (err) {
        next(err);
    }
}

export const googleAuth = async (req, res, next) =>{
     try{
        let user = await User.findOne({email: req.body.email}).lean() ;

        if(user){ 
            let jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'}) ;
            let { password: pass, ...userInfo } = user ;
            res.cookie('accessToken', jwtToken, {httpOnly: true})
            .status(200)
            .json({...userInfo, success: true}) ;

            
        }
        else{
            let generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) ;
            let hashedPassword = generatedPassword && bcryptjs.hashSync(generatedPassword, 10) ;

            const newUserByGoogleAuth = new User({email: req.body.email, username: req.body.name, profile_img: req.body.photoUrl, password: hashedPassword});
            await newUserByGoogleAuth.save() ;

            let jwtToken = jwt.sign({id: newUserByGoogleAuth._id}, process.env.JWT_SECRET, {expiresIn: '1h'}) ;
            const {password: pass, ...rest} = newUserByGoogleAuth._doc ;
            
            res.cookie('accessToken', jwtToken, {httpOnly: true}).status(200).json({...rest, success: true});
        }

     }
     catch (error){
        next(error) ;
     }
}


