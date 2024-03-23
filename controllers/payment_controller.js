// Importing middleware for catching asynchronous errors
const catchAsyncErrors = require("../middlewares/catchAsyncError");

// Importing the Stripe library and initializing it with the secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Controller function for handling order payment
exports.orderPayment = catchAsyncErrors(
    async (req, res, next) => {
      
  // Creating a payment intent using Stripe
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    description: "purchasing items through e-commerce",
    currency: "usd",
    metadata: {
      company: "Ecommerce",
    },
    
  });

  // Responding with success and client secret for the payment intent
  res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

// Controller function for sending the Stripe API key to the client
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  // Responding with the Stripe API key stored in the environment variables
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
