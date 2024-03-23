const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_model');
require("dotenv").config(); 

// Middleware function for verifying JWT token from cookie
const auth = async (req, res, next) => {
    try {
        // Extracting the JWT token from the cookie
        const token = req.cookies.token;

        // If token is missing
        if (!token) {
            return res.status(401).json({ message: 'Firstly login to acess this resource' });
        }

        // Verifying the token using JWT and secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Finding the user associated with the decoded user ID
        const genuineUser = await UserModel.findById(decoded._id);

        // If user doesn't exist, return 401 Unauthorized
        if (!genuineUser) {
            return res.status(401).json({ message: 'Invalid token: User not found' });
        }

        // Attaching user object to request for further processing
        req.user = genuineUser;

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // If token is expired
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        // If token is invalid
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // For other unexpected errors
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = auth;
