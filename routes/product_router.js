const express = require("express");

const router = express.Router();

const {
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteProductReview,
    getAdminProducts
} = require("../controllers/product_controller");

const auth = require("../middlewares/auth_middleware")

const authorizeRole = require("../middlewares/role_middleware")

// Route for admin to create a new product 
router.route("/admin/product/create")
    .post(auth, authorizeRole("admin"), createProduct);

// Route for admin 
router.route("/admin/product/:_id")

    // to update a product by id
    .put(auth, authorizeRole("admin"), updateProduct)
    // to delete a product by id
    .delete(auth, authorizeRole("admin"), deleteProduct);

router.route("/admin/products")

.get(auth, authorizeRole("admin"), getAdminProducts)

// Route for user to get a product by its ID 
router.route("/product/:_id")
    .get(getProduct)

// Route for user to get all products 
router.route("/products")
    .get(getAllProduct);


// Route for user 
router.route("/review")

    // to create the review ,if already created then update
    .put(auth, createProductReview)
    // to delete the review of a product
    .delete(auth, deleteProductReview)


// Route for user 
router.route("/reviews")
    // to get all the reviews of a product
    .get(getProductReviews)



module.exports = router;
