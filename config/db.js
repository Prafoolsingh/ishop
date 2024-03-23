// Importing mongoose to interact with MongoDB
const mongoose = require("mongoose");

// Loading environment variables from .env file
require("dotenv").config();

// Connecting to MongoDB using the URI specified in the environment variables
mongoose.connect(process.env.MONGO_URI)
    .then((data) => {
        // Log a success message when the connection is established
        console.log(`MongoDB connection established successfully.`);
    })
    .catch((err) => {
        // Log an error message if there's a problem connecting to the database
        console.log("Error connecting to the database:", err);
    });

// Exporting the mongoose object to be used elsewhere in the application
module.exports = mongoose;
