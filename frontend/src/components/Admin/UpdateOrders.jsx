import React, { useEffect, useState } from "react";
import MetaData from "../layout/metaData/MetaData";
import { useParams } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/order_action";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { UPDATE_ORDER_RESET } from "../../constants/order_constant";
import { Typography } from "@mui/material";

const UpdateOrders = () => {
  const { _id } = useParams();
  const { order, error, loading } = useSelector(
    (state) => state.orderDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.adminUpdateOrder
  );

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(_id));
  }, [dispatch, error, _id, isUpdated, updateError]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(_id, myForm));
  };

  return (
    <>
      <MetaData title="Process Order" />
      {loading ? (
        <Loader />
      ) : (
        <div className="container py-3">
          <div className="row">

            <div className="col-lg-6">
              <Typography variant="h5" className="mb-4 text-primary fw-bold">
                Shipping Info
              </Typography>
              <div className="border border-primary rounded p-4 mb-4">
                <div className="mb-3">
                  <Typography variant="body1" className="text-muted">
                    Name:
                  </Typography>
                  <span>{order?.user?.name}</span>
                </div>
                <div className="mb-3">
                  <Typography variant="body1" className="text-muted">
                    Phone:
                  </Typography>
                  <span>{order?.shippingInfo?.phoneNo}</span>
                </div>
                <div className="mb-3">
                  <Typography variant="body1" className="text-muted">
                    Address:
                  </Typography>
                  <span>
                    {order?.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <Typography variant="h5" className="mb-4 text-primary fw-bold">
                Payment
              </Typography>
              <div className="border border-primary rounded p-4 mb-4">
                <div className="mb-3">
                  <Typography variant="body1" className="text-muted">
                    Status:
                  </Typography>
                  <span
                    className={`fw-bold ${
                      order?.paymentInfo?.status === "succeeded"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {order?.paymentInfo?.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </span>
                </div>

                <div className="mb-3">
                  <Typography variant="body1" className="text-muted">
                    Amount:
                  </Typography>
                  <span>{order?.totalPrice}</span>
                </div>
              </div>
            </div>

           <div className="col-lg-2"></div>

              <div className="col-lg-4">
                <Typography variant="h5" className="mb-4 text-primary fw-bold">
                  Order Status
                </Typography>
                <div className="border border-primary rounded p-4 mb-4">
                  <div className="mb-3">
                    <Typography variant="body1" className="text-muted">
                      Status:
                    </Typography>
                    <span
                      className={`fw-bold ${
                        order?.orderStatus === "Delivered"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {order?.orderStatus}
                    </span>
                  </div>
                </div>

                {order?.orderStatus !== "Delivered" && (
                <form onSubmit={updateOrderSubmitHandler}>
                  <Typography variant="h5" className="mb-4 text-primary fw-bold">
                    Process Order
                  </Typography>
                  <div className="mb-3">
                  
                    <select
                      className="form-select"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      {order?.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order?.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !status}
                    className="btn w-100 text-white"
                  >
                    Change Status
                  </Button>
                </form>)}


              </div>
           
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateOrders;
