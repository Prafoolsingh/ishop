import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MetaData from "../layout/metaData/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/order_action";
import Loader from "../layout/loader/Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(_id)); 
  }, [dispatch, error, _id]); 

  return (
    <Fragment>
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-8">
              <h2 className="mb-4">Order #{order && order._id}</h2>
              <div>
                <h4>Shipping Information</h4>
                <div className="mb-3">
                  <p><strong>Name:</strong> {order.user && order.user.name}</p>
                  <p><strong>Phone:</strong> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                  <p><strong>Address:</strong> {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
                </div>
                <h4>Payment Details</h4>
                <div className="mb-3">
                  <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "text-success" : "text-danger"}>
                    {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                  </p>
                  <p><strong>Amount:</strong> ₹{order.totalPrice && order.totalPrice}</p>
                </div>
                <h4>Order Status</h4>
                <div>
                  <p className={order.orderStatus && order.orderStatus === "Delivered" ? "text-success" : "text-danger"}>
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <h4>Order Items:</h4>
                <div className="list-group">
                  {order.orderItems && order.orderItems.map((item) => (
                    <Link key={item.product} to={`/product/${item.product}`} className="list-group-item list-group-item-action mb-2">
                      <img src={item.image} alt="Product" className="img-fluid mr-3" style={{ width: '50px' }} />
                      {item.name} <span className="float-right">₹{item.price * item.quantity}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderDetails;
