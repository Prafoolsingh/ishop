const express = require("express");

const auth = require("../middlewares/auth_middleware")

const authorizeRole = require("../middlewares/role_middleware")

const {
    createOrder,
    getSingleOrder,
    getMyOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
} = require("../controllers/order_controller");


const router = express.Router();

// protected routes for user 
router.route("/order")
    // to create order
    .post(auth, createOrder)
    // to get all its orders
    .get(auth, getMyOrders)

// protected routes for user 
router.route("/order/:_id")
    // to create order
    .get(auth, getSingleOrder)


// protected routes for user 
router.route("/orders")
    // to get all its orders
    .get(auth, getMyOrders)


// Protected routes for Admin 
router.route("/admin/orders")
    .get(auth, authorizeRole("admin"), getAllOrders)


// Protected routes for Admin 
router.route("/admin/order/:_id")
    // to update order status
    .put(auth, authorizeRole("admin"),updateOrder)
    // to delete an order 
    .delete(auth, authorizeRole("admin"),deleteOrder)

module.exports = router
