const mongoose = require("mongoose")

const validator = require("validator")

// Define the user schema
const userSchema = new mongoose.Schema({

    // Name of the user
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [4, "Name should have at least 4 characters"]
    },

    // Email of the user
    email: {
        type: String,
        lowercase: true,
        required: [true, "Please enter your e-mail"],
        unique: true,
        // Validate email format using the validator library
        validate: [validator.isEmail, "Please enter a valid Email"]
    },

    // Password of the user
    password: {
        type: String,
        required: [true, "Please enter a Password"]
    },

    // Avatar of the user
    avatar: {
        // Public ID of the avatar image
        public_id: {
            type: String,
            required: true
        },
        // URL of the avatar image
        url: {
            type: String,
            required: true
        }
    },


    // Role of the user
    role: {
        type: String,
        default: "user" 
    },

    // Token used for resetting the password
    resetPasswordToken: String,

    // Expiration time for the reset password token
    resetPasswordExpire: Date,

    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Exporting the mongoose model for the User collection
module.exports = mongoose.model("User", userSchema)
