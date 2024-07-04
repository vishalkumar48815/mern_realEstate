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
        res.status(200).json({...rest, success: true});

    }
    catch (error) {
        next(error)
    }
}



export const deleteUser = async (req, res, next) => {
    try {
        // Check if the authenticated user is deleting their own account
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, 'You can only delete your own account!'));
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(req.user.id);

        // Check if deletion was successful
        if (deletedUser.deletedCount === 0) {
            return next(errorHandler(404, 'User not found or could not be deleted.'));
        }

        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully.', success: true }).clearCookie('accessToken');
    } catch (error) {
        next(error); // Pass any caught errors to the error handler middleware
    }
};




export const signOutUser = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        // Respond with a success message
        res.status(200).json({ message: 'User signed out successfully!', success: true });
    } catch (error) {
        next(error); // Pass any caught errors to the error handler middleware
    }
};