// Importing Axios for making HTTP requests
import axios from "axios";

// Importing constants related to cart actions
import {
    ADD_TO_CART,
    EMPTY_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO
} from "../constants/cart_constants";

// Action creator to add items to cart
export const addItemsToCart = (_id, quantity = 1) => async (dispatch, getState) => {

    // Fetching product data from the server
    const { data } = await axios.get(`/api/v1/product/${_id}`);

    // Dispatching action to add item to cart
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });

    // Saving cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Action creator to remove item from cart
export const removeItemsFromCart = (_id) => async (dispatch, getState) => {

    // Dispatching action to remove item from cart
    dispatch({
        type: REMOVE_FROM_CART,
        payload: _id,
    });

    // Saving cart items to local storage after removing item
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Action creator to empty the cart
export const emptyCart = () => async (dispatch, getState) => {

    // Dispatching action to empty the cart
    dispatch({ type: EMPTY_CART });

    // Saving empty cart state to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Action creator to save shipping information
export const saveShippingInfo = (data) => async (dispatch) => {
    
    // Dispatching action to save shipping information
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    // Saving shipping information to local storage
    localStorage.setItem('shippingInfo', JSON.stringify(data));
}
