import { createStore, combineReducers, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";

import { adminGetproductsReducer, adminNewProductReducer, adminUpdateProductReducer, deleteReviewReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, productsReducer } from "./reducers/product_reducer";

import { userReducer, profileReducer, forgotResetReducer, adminAllUsersReducer, adminUserDetailsReducer, adminUpdateusersReducer } from "./reducers/user_reducer";

import { cartReducer } from "./reducers/cart_reducer";

import { adminAllOrdersReducer, adminUpdateOrderReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/order_reducer';


const reducer = combineReducers({


  // products reducers
  products: productsReducer,

  productDetails: productDetailsReducer,
 
  newReview: newReviewReducer,

  productReviews: productReviewsReducer,

  deleteReview: deleteReviewReducer,

  adminNewProduct: adminNewProductReducer,

  adminGetproducts: adminGetproductsReducer,

  adminUpdateProduct: adminUpdateProductReducer,

  // user reducers
  userInfo: userReducer,

  profileDetails: profileReducer,

  forgotResetPassword: forgotResetReducer,

  productNewReview: newReviewReducer,

  adminAllUsers: adminAllUsersReducer,

  adminUserDetails: adminUserDetailsReducer,

  adminUpdateusers: adminUpdateusersReducer,


  // order reducers
  newOrder: newOrderReducer,

  myOrders: myOrdersReducer,

  orderDetails:orderDetailsReducer,

  adminAllOrders:adminAllOrdersReducer,

  adminUpdateOrder:adminUpdateOrderReducer,

  // cart reducers
  cart: cartReducer

});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],


    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  }
};


const middleware = [thunk];


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;