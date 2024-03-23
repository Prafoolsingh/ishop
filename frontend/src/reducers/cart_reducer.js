import {
    ADD_TO_CART, 
    EMPTY_CART, 
    REMOVE_FROM_CART, 
    SAVE_SHIPPING_INFO 
} from "../constants/cart_constants";

// Reducer function to manage the state of the shopping cart
export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, { type, payload }) => {

    switch (type) {
        
        // Action to add an item to the cart
        case ADD_TO_CART:
            const item = payload;
            const isItemExist = state.cartItems.find((e) => e.product === item.product);

            if (isItemExist) {
                // If the item already exists in the cart, update its quantity
                return {
                    ...state,
                    cartItems: state.cartItems.map((e) =>
                        e.product === isItemExist.product ? item : e
                    ),
                }
            } else {
                // If the item is not in the cart, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        // Action to remove an item from the cart
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((e) => e.product !== payload)
            }

        // Action to empty the cart
        case EMPTY_CART:
            return {
                ...state,
                cartItems: [],
            }

        // Action to save shipping information
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: payload
            }

        // Default case: return the current state
        default:
            return state;
    }
}
