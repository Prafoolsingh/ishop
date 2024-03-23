import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/order_constant";
import axios from "axios";

// Action creator for creating a new order (user)
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Making a POST request to create a new order
    const { data } = await axios.post("/api/v1/order", order, config);

    // Dispatching action with the newly created order
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action creator for retrieving user's orders (user)
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    // Making a GET request to retrieve user's orders
    const { data } = await axios.get("/api/v1/orders");

    // Dispatching action with user's orders
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    // Dispatching action in case of failure with error message
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action creator for retrieving details of a specific order (user)
export const getOrderDetails = (_id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    // Making a GET request to retrieve details of a specific order
    const { data } = await axios.get(`/api/v1/order/${_id}`);

    // Dispatching action with order details
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });

  } catch (error) {

    // Dispatching action in case of failure with error message
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });

  }
};

// Action creator for updating an order (admin)
export const updateOrder = (_id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Making a PUT request to update an order
    const { data } = await axios.put(
      `/api/v1/admin/order/${_id}`,
      order,
      config
    );

    // Dispatching action with success message
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });

  } catch (error) {

    // Dispatching action in case of failure with error message
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });

  }
};

// Action creator for deleting an order (admin)
export const deleteOrder = (_id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    // Making a DELETE request to delete an order
    const { data } = await axios.delete(`/api/v1/admin/order/${_id}`);

    // Dispatching action with success message
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });

  } catch (error) {

    // Dispatching action in case of failure with error message
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });

  }
};

// Action creator for retrieving all orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    // Making a GET request to retrieve all orders
    const { data } = await axios.get("/api/v1/admin/orders");

    // Dispatching action with all orders
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });

  } catch (error) {

    // Dispatching action in case of failure with error message
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
    
  }
};

// Action creator for clearing errors
export const clearErrors = () => async (dispatch) => {
  // Dispatching action to clear errors
  dispatch({ type: CLEAR_ERRORS });
};
