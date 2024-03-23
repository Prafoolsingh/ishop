const express = require("express");

const { orderPayment, sendStripeApiKey } = require("../controllers/payment_controller");

const router = express.Router();

const auth = require("../middlewares/auth_middleware");

// Route for handling payment order
router.route("/order/payment").post(auth, orderPayment);

// Route for sending Stripe API key
router.route("/stripeapikey").get(auth, sendStripeApiKey);


// Exporting the router for use in server.js file
module.exports = router; 
