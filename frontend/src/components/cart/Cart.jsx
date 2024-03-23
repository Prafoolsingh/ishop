
import React from "react";
import CartItem from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart, emptyCart } from "../../actions/cart_action";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (_id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock >= newQty) {
            dispatch(addItemsToCart(_id, newQty));
        }
    };

    const decreaseQuantity = (_id, quantity) => {
        const newQty = quantity - 1;
        if (newQty >= 1) {
            dispatch(addItemsToCart(_id, newQty));
        }
    };

    const deleteCartItems = (_id) => {
        dispatch(removeItemsFromCart(_id));
    };

    const clearAllItems = () => {
        dispatch(emptyCart());
    };

    const checkoutHandler = () => {
        navigate("/shipping");
    };

    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="container vh-100 d-flex align-items-center justify-content-center">
                    <div className="emptyCart text-center">
                        <RemoveShoppingCartIcon style={{ fontSize: '10rem' }} />
                        <Typography variant="h6">No Product in Your Cart</Typography>
                        <Link to="/products" className="btn btn-primary mt-3">View Products</Link>
                    </div>
                </div>
            ) : (
                <div className="container mt-3 shadow-lg">
                    
                    <div className="row py-3 px-5">
                        <div class="Cart-Component-Left-Above p-2 px-3">
                            <p className="mt-2 fs-5">Added Products:</p>
                            <button className="btn btn-danger btn-sm" onClick={clearAllItems}>Clear all</button>
                        </div>
                    </div>

                    <div className="row ">
                        {cartItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <CartItem
                                    item={item}
                                    deleteCartItems={deleteCartItems}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity} />
                                <hr className="my-3"/>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="row p-5">
                        <div class="Cart-Component-Left-Above p-2 px-3">
                            <p className="mt-2 fs-5">Total:</p>
                            <p>{`₹${total}`}</p>
                        </div>
                        <button className="btn btn-dark text-center w-50 w-100-sm mx-auto mt-5 checkoutBtn" onClick={checkoutHandler}>Checkout</button>
                    </div>
                    
                </div>
            )}
        </>
    );
};

export default Cart;
