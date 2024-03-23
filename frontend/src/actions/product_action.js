import axios from "axios";

import {

  // Constants for all product actions
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,

  // Constants for product detail actions
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,

  // Constants for new review actions
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,

  // Constants for all review actions
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,

  // Constants for delete review actions
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,

  // Constants for admin product actions
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,

  // Constants for creating a new product actions
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,

  // Constants for updating a product actions
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,

  // Constants for deleting a product actions
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,

  // Constant for clearing errors
  CLEAR_ERRORS,

} from "../constants/product_constant";

// Action to Get All Products (user)
export const getAllProducts = (keyword = "", currentPage = 1, price = [0, 10000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      // Constructing the API URL based on provided parameters
      let api = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        api = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      // Making a GET request to retrieve products
      const { data } = await axios.get(api);

      // Dispatching action with the retrieved products
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });

    } catch (error) {
      // Dispatching action in case of failure with error message
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// Action to Get product details (user)
export const getProductDetails = (_id) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });

      // Making a GET request to retrieve product details
      const { data } = await axios.get(`http://localhost:4000/api/v1/product/${_id}`);

      // Dispatching action with the retrieved product details
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      // Dispatching action in case of failure with error message
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action to post a review or update an existing review (user)
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    // Making a PUT request to post a new review or update an existing one
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    // Dispatching action with success message
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to Get All Reviews of a Product
export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    // Making a GET request to retrieve all reviews of a product
    const { data } = await axios.get(`/api/v1/reviews?productId=${productId}`);

    // Dispatching action with all reviews
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    // Making a DELETE request to delete a review
    const { data } = await axios.delete(
      `/api/v1/review?reviewId=${reviewId}&productId=${productId}`
    );

    // Dispatching action with success message
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Action to Create a Product (admin)
export const createAdminProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/admin/product/create`, productData, config);
console.log(data);
    // Dispatching action with success message
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Action to Get All Products (admin)
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    // Making a GET request to retrieve all products for admin
    const { data } = await axios.get("/api/v1/admin/products");

    // Dispatching action with all admin products
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to Update Product (admin)
export const updateAdminProduct = (_id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    // Making a PUT request to update a product
    const { data } = await axios.put(
      `/api/v1/admin/product/${_id}`,
      productData,
      config
    );

    // Dispatching action with success message
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to Delete Product (admin)
export const deleteAdminProduct = (_id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    // Making a DELETE request to delete a product
    const { data } = await axios.delete(`/api/v1/admin/product/${_id}`);

    // Dispatching action with success message
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action to Clearing Errors
export const clearErrors = () => async (dispatch) => {
  // Dispatching action to clear errors
  dispatch({ type: CLEAR_ERRORS });
}; 
