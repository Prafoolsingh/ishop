const User = require("../models/user_model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middlewares/catchAsyncError");

require("dotenv").config();

const nodemailer = require("nodemailer");

const cloudinary = require("cloudinary").v2;

const fs = require('fs');



// controller function for regestring user 
const signUp = catchAsyncErrors(async (req, res, next) => {

    // Check if avatar file exists in the request
    if (!req.files || !req.files.avatar) {
        return next(new ErrorHandler(400, "Please upload Profile picture"));
    }

    const avatarFile = req.files.avatar;

    const myCloud = await cloudinary.uploader.upload(avatarFile.tempFilePath, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

     // Delete file from server after successful upload to Cloudinary
     fs.unlinkSync(avatarFile.tempFilePath);

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    await user.save();

    // Generating token after successful registration
    const payload = {
        _id: user._id
    };
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey);

    // Set token in a cookie
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    });

    const userInfo = { "email": user.email, "name": user.name, "avatar": user.avatar, "token": token };

    // Return success response with token
    return res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: userInfo
    });
});



// controller function for loggin in user
const login = catchAsyncErrors(
    async (req, res, next) => {
        const { email, password } = req.body;

        // Checking if email and password are provided
        if (!email || !password) {
            return next(new ErrorHandler(400, "One or more mandatory fields are empty"));
        }

        const existingUser = await User.findOne({ email: email });

        // If user email doesn't exist
        if (!existingUser) {
            return next(new ErrorHandler(401, "Invalid credentials"));
        }

        // If user email is found then comparing the password with the encrypted password stored in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return next(new ErrorHandler(401, "Invalid credentials"));
        }

        // Generating a JSON Web Token (JWT) for authentication
        const payload = {
            _id: existingUser._id
        };

        const secretKey = process.env.SECRET_KEY;

        const token = jwt.sign(payload, secretKey);

        // Setting the token in a cookie named "token"
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
        });

        const userInfo = { "email": existingUser.email, "name": existingUser.name, "token": token };

        res.status(200).json({
            token: token,
            user: userInfo,
            message: "JWT token generated and user logged in successfully"
        });
    }
);


// controller function for logging out user
const logout = (req, res) => {
    // Clearing the token cookie
    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: "Token cleared from cookie and User logged out successfully",
    });
};



// controller function to handle user forgotPassword
const forgotPassword = catchAsyncErrors(
    async (req, res, next) => {
        const { email } = req.body;

        // Finding user by email
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorHandler(404, "User not found"));
        }

        // Generating a reset token
        const reset_token = jwt.sign({ _id: user._id }, process.env.RESET_SECRET_KEY, { expiresIn: '1h' });

        // Updating user document with new reset token and its expiration time
        user.resetPasswordToken = reset_token;
        user.resetPasswordExpire = Date.now() + 3600000;

        await user.save();

        // Sending a password reset email through postman
        // const resetURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${reset_token}`;


        // Sending a password reset email through frontend
        // const resetURL = `${process.env.FRONTEND_URL}/password/reset/${reset_token}`;


        // Sending a password reset email through deployed website
        const resetURL = `${req.protocol}://${req.get("host")}/password/reset/${reset_token}`

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            to: email,
            subject: "Password Reset Request",
            text: `Dear User,\n\n`
                + `You are receiving this email because a request has been made to reset the password for your account.\n\n`
                + `If you did not make this request, please ignore this email.\n\n`
                + `To reset your password, please click on the link below:\n\n`
                + `${resetURL}\n\n`
                + `Please note that this link will expire in one hour.\n\n`
                + `Best regards,\n`
                + `Prafool singh kafaliya`
        });

        res.status(200).json({
            success: true,
            message: `Password reset email sent successfully to ${user.email}`,
        });
    }
);


// controller function for resetting user's password 
const resetPassword = catchAsyncErrors(
    async (req, res, next) => {
        const { newPassword, confirmPassword } = req.body;
        const { reset_token } = req.params;

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return next(new ErrorHandler(400, "New password and confirm password do not match"));
        }

        // Verifying JWT token
        const decoded = jwt.verify(reset_token, process.env.RESET_SECRET_KEY);

        const _id = decoded._id;

        // Finding user by ID
        const user = await User.findById(_id);
        if (!user) {
            return next(new ErrorHandler(404, "User not found"));
        }

        // Checking if the reset token in the request matches the token stored in the user's document
        if (reset_token !== user.resetPasswordToken) {
            return next(new ErrorHandler(400, "Your reset_token is invalid ! Try again"));
        }


        // Retrieving the current user's password from the database
        const oldPassword = user.password;

        // Checking if the new password is the same as the old password
        const isSamePassword = await bcrypt.compare(newPassword, oldPassword);
        if (isSamePassword) {
            return next(new ErrorHandler(400, "New password must be different from your old password"));
        }

        // Hashing the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Updating user's password in the database
        user.password = hashedPassword;

        // Clearing any existing reset token and its expiration time
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
    }
);

 
// controller function for user to get its details
const getUserDetails = catchAsyncErrors(
    async (req, res, next) => {
        const userId = req.user._id;

        // Finding user details by ID
        const user = await User.findById(userId);

        if (!user) {
            return next(new ErrorHandler(404, "User not found"));
        }

        res.status(200).json({
            success: true,
            user: user,
        });
    }
);


// controller function for user to update its password
const updatePassword = catchAsyncErrors(
    async (req, res, next) => {
        const userId = req.user._id; // Retrieve user ID from request

        // Destructure the old password, new password, and confirm password from the request body
        const { oldPassword, newPassword, confirmPassword } = req.body;


        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(new ErrorHandler(404, "User not found"));
        }

        // Check if the old password matches the password stored in the database
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return next(new ErrorHandler(400, "Old password is incorrect"));
        }

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            return next(new ErrorHandler(400, "New password and confirm password do not match"));
        }

        // Check if the new password is the same as the old password
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return next(new ErrorHandler(400, "New password must be different from your old password"));
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database using findByIdAndUpdate
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    }
);


const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const { name, email } = req.body;
    let avatar = req.user.avatar;

    // Check if avatar file exists in the request
    if (req.files && req.files.avatar) {
        const avatarFile = req.files.avatar;
        const myCloud = await cloudinary.uploader.upload(avatarFile.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        // Remove old avatar from cloudinary if it exists
        if (avatar && avatar.public_id) {
            await cloudinary.uploader.destroy(avatar.public_id);
        }

        // Update avatar with new image data
        avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    // Update user's profile information including avatar
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email, avatar }, { new: true });

    // Check if the user was found and updated
    if (!updatedUser) {
        return next(new ErrorHandler(404, "User not found"));
    }

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser
    });
});



// Controller function for admin to get all users
const getAllUser = catchAsyncErrors(
    async (req, res, next) => {
        // Retrieve all users from the database
        const users = await User.find();

        // Send a JSON response with the list of users
        res.status(200).json({
            success: true,
            users
        });
    }
);


// Controller function for admin to get a user by id 
const getUser = catchAsyncErrors(
    async (req, res, next) => {

        const { _id } = req.params;

        // Retrieve the user from the database by id
        const user = await User.findById(_id);

        // Check if the user exists
        if (!user) {
            return next(new ErrorHandler(404, `User not found with id :${_id}`));
        }

        // Send a JSON response with the retrieved user
        res.status(200).json({
            success: true,
            user
        });

    }
);


// controller function for admin to update user's Profile
const updateUser = catchAsyncErrors(
    async (req, res, next) => {

        const { _id } = req.params

        const { name, email, role } = req.body;

        // Update user's profile information
        const updatedUser = await User.findByIdAndUpdate(_id, { name, email, role }, { new: true });

        // Check if the user was found and updated
        if (!updatedUser) {
            return next(new ErrorHandler(404, `User not found with _id:${_id}`));
        }

        res.status(200).json({
            success: true,
            message: 'User has updated successfully',
            user: updatedUser
        });

    }
);


// controller function for admin to delete a user
const deleteUser = catchAsyncErrors(
    async (req, res, next) => {

        const { _id } = req.params;

        const user = await User.findByIdAndDelete(_id);

        // Check if the user was found and deleted
        if (!user) {
            return next(new ErrorHandler(404, `User not found with _id: ${_id}`));
        }

        res.status(200).json({
            success: true,
            message: 'User has been deleted successfully',
        });

    }
);



module.exports = {
    signUp,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
};