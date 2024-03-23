const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.ObjectId;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Description "]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Price "],
        maxLength: [8, "Price can not exceed 8 digit"]
    },
    ratings: {
        type: Number,
        default: 0

    },

    // we will make an array of images so that we can post multiple images

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }

        }
    ],
    category: {
        type: String,
        required: [true, "Please enter Product key"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product stock"],
        maxLength: [4, "stock can't exceed 4 charaters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {

            userId: {
                type: ObjectId,
                ref: "User", // Referencing the User model for user information      
                required: true
            },

            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }

        }
    ],

    createdAt: {
        type: Date,
        default: Date.now()
    },

    userId: {
        type: ObjectId, // Field type is ObjectId for referencing other documents

        ref: "User", // Referencing the User model for user information

        required: true

    },

})

//  exporting model of schema which we have created

module.exports = mongoose.model("Product", productSchema)