// Importing the Product model
const Product = require("../models/product_model");

// Importing the ApiFeature utility
const ApiFeatures = require("../utils/apiFeature");

// Importing the ErrorHandler utility
const ErrorHandler = require("../utils/errorHandler");

// Importing the catchAsyncErrors middleware
const catchAsyncErrors = require("../middlewares/catchAsyncError");

// Importing the Cloudinary library
const cloudinary = require("cloudinary").v2;


// Controller function for creating a product
const createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    // Checking if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler(404, "no files uploaded"));;
    }

    // If only one file is uploaded, convert it to an array
    if (!Array.isArray(req.files.images)) {
        req.files.images = [req.files.images];
    }

    // Uploading each image to Cloudinary
    for (let i = 0; i < req.files.images.length; i++) {
        const image = req.files.images[i];
        const result = await cloudinary.uploader.upload(image.tempFilePath, { folder: "products" });

        console.log("Uploaded image result:", result);

        images.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    // Storing uploaded image details in `images`
    req.body.images = images;
    req.body.userId = req.user._id;

    // Creating the product
    const product = await Product.create(req.body);

    // Sending the response
    res.status(201).json({
        success: true,
        product,
    });
});

// Controller function for updating a product
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.params;

    // Finding the product by ID
    let product = await Product.findById(_id);

    // Checking if the product exists
    if (!product) {
        return next(new ErrorHandler(404, "Product not found"));
    }

    let images = [];

    // Checking if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        // If no files are uploaded, update only the product data
        product.set(req.body);
        product = await product.save();
    } else {
        // If files are uploaded, upload each image to Cloudinary
        const uploadedImages = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

        for (let i = 0; i < uploadedImages.length; i++) {
            const image = uploadedImages[i];
            const result = await cloudinary.uploader.upload(image.tempFilePath, { folder: "products" });

            images.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // Deleting existing images from Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        // Updating product's images with the new ones
        product.images = images;

        // Updating the product data
        product.set(req.body);
        product = await product.save();
    }

    // Sending the response
    res.status(200).json({
        success: true,
        product,
    });
});

// Controller function for getting all products
const getAllProduct = catchAsyncErrors(
    async (req, res, next) => {

        const resultPerPage = 11;

        // Getting the total number of documents matching the query
        const productCount = await Product.countDocuments()

        // Initializing ApiFeatures with the product query and request query string
        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        // Executing the query
        const products = await apiFeatures.query;

        res.status(200).json({
            success: true,
            products,
            // Getting all documents count present in collection irrespective of search(), filter(), and pagination
            productCount,
            resultPerPage
        });
    });

// Controller function for getting all products for admin
const getAdminProducts = catchAsyncErrors(
    async (req, res, next) => {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            products,
        });
    });

// Controller function for getting a single product by ID
const getProduct = catchAsyncErrors(
    async (req, res, next) => {

        const { _id } = req.params;

        const product = await Product.findById(_id);

        if (!product) {

            return next(new ErrorHandler(404, "Product not found"));
        }
        res.status(200).json({
            success: true,
            message: "Product found successfully",
            product
        });

    });

// Controller function for deleting a single product by ID
const deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        const { _id } = req.params;
        const product = await Product.findByIdAndDelete(_id);
        if (!product) {
            return next(new ErrorHandler(404, "Product not found"));
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: product
        });
    }
);


// Controller function for creating or updating product reviews
const createProductReview = catchAsyncErrors(
    async (req, res, next) => {

        // Extracting user ID from the request user object
        const userId = req.user._id;

        // Extracting user name from the request user object
        const name = req.user.name;

        // Extracting rating, comment, and product ID from the request body
        const { rating, comment, productId } = req.body;

        // Constructing a review object with the extracted data
        const review = {
            userId,
            name,
            rating: Number(rating),
            comment
        };

        // Retrieving the product from the database based on the provided product ID
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler(404, "Product not found"));
        }

        // Checking if the user has already reviewed the product
        const existingReviewIndex = product.reviews.findIndex(
            (rev) => rev.userId.toString() === userId.toString()
        );

        // If an existing review is found, updating it; otherwise, adding a new review
        if (existingReviewIndex !== -1) {

            // Updating existing review
            product.reviews[existingReviewIndex].rating = review.rating;
            product.reviews[existingReviewIndex].comment = review.comment;
        } else {

            // Adding new review to the product's reviews array
            product.reviews.push(review);
        }

        // Updating the number of reviews for the product
        product.numOfReviews = product.reviews.length;

        // Calculating the average rating for the product
        let totalRating = 0;
        product.reviews.forEach((rev) => {
            totalRating += rev.rating;
        });
        product.ratings = totalRating / product.numOfReviews;

        // Saving the updated product in the database
        // Saving the updated product in the database
        await product.save({ validateBeforeSave: false });

        // Sending a success response with the updated product data
        res.status(200).json({
            success: true,
            product
        });
    }
);


// Controller function for getting all reviews of a product by product ID 
const getProductReviews = catchAsyncErrors(
    async (req, res, next) => {
        const { productId } = req.query;
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler(404, "Product not found"));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        });
    });


// Controller function for deleting a product review
const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    // Extracting productId and reviewId from request query
    const { productId, reviewId } = req.query;

    // Finding the product by its ID
    const product = await Product.findById(productId);

    // Checking if product exists
    if (!product) {
        // If product is not found, return an error
        return next(new ErrorHandler(404, "Product not found"));
    }

    // Finding the index of the review in the product's reviews array
    const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId);

    // Checking if the review exists in the product's reviews array
    if (reviewIndex === -1) {
        // If review is not found, return an error
        return next(new ErrorHandler(404, "Review not found"));
    }

    // Filtering out the review to delete from the product's reviews array
    const updatedReviews = product.reviews.filter((_, index) => index !== reviewIndex);

    // Calculating new average rating
    let totalRating = 0;
    // Iterating through the updated reviews to calculate total rating
    updatedReviews.forEach(review => {
        totalRating += review.rating;
    });
    // Calculating average rating
    const averageRating = updatedReviews.length > 0 ? totalRating / updatedReviews.length : 0;

    // Updating number of reviews
    const numberOfReviews = updatedReviews.length;

    // Updating the product with the modified reviews, average rating, and number of reviews
    await Product.findByIdAndUpdate(
        productId,
        {
            reviews: updatedReviews,
            ratings: averageRating,
            numOfReviews: numberOfReviews,
        },
        {
            // Setting options for findByIdAndUpdate method
            new: true,
            runValidators: true

        }
    );

    // Sending success response
    res.status(200).json({
        success: true,
        reviews: updatedReviews
    });
});


// Exporting the controller functions
module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    getAdminProducts,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteProductReview
};
