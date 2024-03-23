// Importing required modules

const express = require("express");

const PORT=process.env.PORT || 4000;

const cookieParser = require('cookie-parser'); 

const cors = require("cors"); 

const error_middleware = require("./middlewares/error_middleware"); 

const userRouter = require("./routes/user_router");

const productRouter = require("./routes/product_router"); 

const orderRouter = require("./routes/order_router"); 

const paymentRouter = require("./routes/payment_router"); 

const bodyParser = require("body-parser"); 

const fileUpload = require("express-fileupload"); 

const cloudinary = require('cloudinary').v2;

const path = require("path");


// Creating an instance of the Express application
const app = express();

// Parsing JSON bodies
app.use(express.json());

// Parsing cookies
app.use(cookieParser());

// Parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Using file upload middleware with temporary file storage
app.use(fileUpload({ useTempFiles: true }));

// Connecting to the database
require("./config/db");



if (process.env.NODE_ENV !== "PRODUCTION") {
// Loading environment variables from .env file
require('dotenv').config();
}


// Configuring Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuring CORS options
const corsOptions = {
  
 origin: process.env.FRONTEND_URL,
    credentials: true, // Allowing credentials (cookies)
    optionSuccessStatus: 200 // Setting success status code
};

app.use(cors(corsOptions)); 

// Adding cookie-parser middleware
app.use(cookieParser());

// Using middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Using product router for routes starting with "/api/v1"
app.use("/api/v1", productRouter);

// Using user router for routes starting with "/api/v1"
app.use("/api/v1", userRouter);

// Using order router for routes starting with "/api/v1"
app.use("/api/v1", orderRouter);

// Using payment router for routes starting with "/api/v1"
app.use("/api/v1", paymentRouter);


// Using error handling middleware
app.use(error_middleware);

// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
