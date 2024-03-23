import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/metaData/MetaData";
import { Typography } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/order_action";

const PaymentOrder = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userInfo);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
     email: user.email,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/order/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          toast.success("Your order has been placed successfully")
          navigate("/orders");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="container my-5">
        <form className="row  paymentForm" onSubmit={(e) => submitHandler(e)}>
        
          <div className="col-lg-4 col-md-8 col-sm-8 col-10 mx-auto p-5 shadow-lg">

          <Typography variant="h4" className="text-center">Card Info</Typography>
            <div>
              <div className="input-group mt-4">
              <span className="input-group-text"><CreditCardIcon/></span>
              <CardNumberElement className="form-control"  />

              </div>
            </div>

            <div className="input-group mt-4">
              <span className="input-group-text"><EventIcon /></span>
              <CardExpiryElement className="form-control" />
            </div>

            <div className="input-group mt-4">
              <span className="input-group-text"><VpnKeyIcon /></span>
              <CardCvcElement className="form-control" />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 mt-4 "
              ref={payBtn}
              disabled={!stripe}
             
            >
              Pay - ₹ {orderInfo && orderInfo.totalPrice}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default PaymentOrder;
