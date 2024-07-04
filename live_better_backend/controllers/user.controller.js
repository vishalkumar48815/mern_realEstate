import User from "../models/user.model.js";
import errorHandler from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id) { return next(errorHandler(401, 'You can only update you account!')) }

    try {
        // Initialize an empty $set object
        const updateFields = {};

        // Conditionally add fields to the $set object
        if (req.body.username) {
            updateFields.username = req.body.username;
        }
        if (req.body.email) {
            updateFields.email = req.body.email;
        }
        if (req.body.password) {
            updateFields.password = req.body.password;
        }
        if (req.body.avatar) {
            updateFields.profile_img = req.body.avatar;
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }



        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: updateFields
        }, { new: true }).lean()

        const { password, ...rest } = updatedUser
        let jwtToken = jwt.sign({id: updatedUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'}) ;
        
        res.status(200).json({...rest, success: true});

    }
    catch (error) {
        next(error)
    }
}

