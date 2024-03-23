const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.ObjectId;

// Defining the order schema
const orderSchema = new mongoose.Schema({

// orders can be multiple so used an array to store data

  orderItems: [
    {
      // we will get that product id which we have to order
      product: {
        type: ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      }

    }
  ],

  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    }
  },

  deliveredAt: Date,

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  paidAt: {
    type: Date,
    required: true,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },

  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Exporting the mongoose model for the User collection
module.exports = mongoose.model("Order", orderSchema)
