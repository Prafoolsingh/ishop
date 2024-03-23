const Order = require("../models/order_model")
const Product = require("../models/product_model")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncError");

// controller function for creating a order
exports.createOrder = catchAsyncErrors(
  async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = new Order({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    })

    // Save the order to the database
    await order.save();


    res.status(201).json({
      success: true,
      message: "order successfully created",
      order,
    });
  });

// Controller function for retrieving an order by its ID and populating the 'user' field with 'name' and 'email'
exports.getSingleOrder = catchAsyncErrors(

  async (req, res, next) => {
    const { _id } = req.params;

    // Finding the order by its ID and populate the 'user' field with 'name' and 'email'
    const order = await Order.findById(_id).populate("user", "name email");

    // If no order is found with the given ID, return an error
    if (!order) {
      return next(new ErrorHandler(404, `There is no order with ID:${_id}`));
    }

    // Respond with the retrieved order
    res.status(200).json({
      success: true,
      order: order
    });
  }
);


// Controller function for genuine user to retrieve its all orders 
exports.getMyOrders = catchAsyncErrors(
  async (req, res, next) => {

    const userId = req.user._id

    // Finding orders associated with the user ID 
    const orders = await Order.find({ user: userId })

    // Respond with the retrieved order
    res.status(200).json({
      success: true,
      orders: orders
    });
  }
);


// Controller function for admin to retrieve all orders 
exports.getAllOrders = catchAsyncErrors(
  async (req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice
    })

    // Respond with the retrieved order
    res.status(200).json({
      success: true,
      totalAmount,
      orders: orders
    });
  }
);


// Controller function for admin to update the status of an order 
exports.updateOrder = catchAsyncErrors(
  async (req, res, next) => {
  // Extracting the order ID and status from the request
  const { _id } = req.params;
  const { status } = req.body;

  // Finding the order by its ID
  const order = await Order.findById(_id);

  // Checking if the order exists
  if (!order) {
    // If the order does not exist, return an error
    return next(new ErrorHandler( 404,"Order not found with this Id"));
  }

  // Checking if the order has already been delivered
  if (order.orderStatus === "Delivered") {
    // If the order has already been delivered, return an error
    return next(new ErrorHandler(400,"You have already delivered this order" ));
  }

  // If the status is being updated to "Shipped", update stock for each order item
  if (status === "Shipped") {
    // Iterating over each order item and updating the stock
    for (const item of order.orderItems) {
      await updateStock(item.product, item.quantity);
    }
  }

  // Updating the order status with the provided status from the request body
  order.orderStatus = status;

  // If the status is being updated to "Delivered", record the delivered time
  if (status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  // Saving the updated order to the database, ignoring validation
  await order.save({ validateBeforeSave: false });

  // Responding with success status
  res.status(200).json({
    success: true,
  });
});



// Asynchronous function to update the stock of a product
async function updateStock(productId, quantity) {
  // Finding the product by its ID
  const product = await Product.findById(productId);

  // Subtracting the ordered quantity from the product's stock
  product.stock -= quantity;

  // Saving the updated product to the database, ignoring validation
  await product.save({ validateBeforeSave: false });
}

// Controller function for admin to delete an order by ID
exports.deleteOrder = catchAsyncErrors(
  async (req, res, next) => {

  // Extracting the order ID from the request parameters
  const { _id } = req.params;

  // Finding the order by its ID and removing it from the database
  const order = await Order.findByIdAndDelete(_id);

  // Checking if the order was found and deleted successfully
  if (!order) {
  
    return next(new ErrorHandler(404,`Order not found with this ID:${_id}`));
  }

  // Responding with a success message
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
