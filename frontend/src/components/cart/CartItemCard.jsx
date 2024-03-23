// CartItemCard.js
import React from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';

const CartItemCard = ({ item, deleteCartItems, increaseQuantity, decreaseQuantity }) => {
    return (
        <div className="row cart-item">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex mt-lg-0 mt-md-5 mt-sm-5 mt-5 align-items-center justify-content-lg-around justify-content-md-start justify-content-sm-center justify-content-center">
                <div>
                    <img src={item.image} className="img-fluid" alt="cart img" style={{ height: "200px", width: "200px", objectFit: "contain" }} />
                </div>
                <div>
                    <p>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </p>
                    <p className="fw-5">{`Price: ₹${item.price}`}</p>
                </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-12 d-flex mt-lg-0 mt-md-5 mt-sm-5 mt-5 justify-content-lg-around   justify-content-md-around justify-content-sm-around justify-content-around align-items-center">
                <Button variant="contained" color="primary" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</Button>
                <input type="number" value={item.quantity} readOnly className="form-control text-center" style={{ width: "50px", margin: "0 10px" }} />
                <Button variant="contained" color="primary" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</Button>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12 d-flex mt-lg-0 mt-md-5 mt-sm-5 mt-5 justify-content-lg-around   justify-content-md-around justify-content-sm-around justify-content-around align-items-center">
                <div>
                    {`${item.price * item.quantity} ₹`}
                </div>
                <div>
                    <DeleteForeverIcon onClick={() => deleteCartItems(item.product)} />
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;
