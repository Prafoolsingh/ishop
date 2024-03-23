// Importing the express module
const express = require("express");

// Importing the authentication middleware
const auth = require("../middlewares/auth_middleware");

const authorizeRole = require("../middlewares/role_middleware")

// Creating a new router instance
const router = express.Router();

// Importing functions from the user_controller module
const {
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
} = require("../controllers/user_controller");



// Route for user registration
router.route("/signup").post(signUp);

// Route for user login
router.route("/login").post(login);

// Route for user logout
router.route("/logout").get(logout);

// Route for initiating the password reset process
router.route("/password/forgot").post(forgotPassword);

// Route for resetting password using the reset token
router.route("/password/reset/:reset_token").put(resetPassword);

// Protected route for authenticated user to get its details
router.route("/profile").get(auth, getUserDetails);

// Protected route for authenticated user to update password
router.route("/password/update").put(auth, updatePassword);

// Protected route for authenticated user to update user profile
router.route("/profile/update").put(auth, updateProfile);


// protected routes for admin 
router.route("/admin/users")
    // to get all users
    .get(auth, authorizeRole("admin"), getAllUser)


// protected route for admin
router.route("/admin/user/:_id")
    // to get a user by id
    .get(auth, authorizeRole("admin"), getUser)
    // to update a user by id
    .put(auth, authorizeRole("admin"), updateUser)
    // to delete a user by id
    .delete(auth, authorizeRole("admin"), deleteUser)


// Exporting the router to be used by other parts of the application
module.exports = router;
