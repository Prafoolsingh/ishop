import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/order_action";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData/MetaData";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from "react-bootstrap";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="container vh-100">
          <div className="row">
            <div className="col-12 mx-auto">
              {orders.length === 0 ? (
                <Alert variant="info" className="text-center mt-5">
                  No orders found.
                </Alert>
              ) : (
                <div className="table-responsive mt-5 text-center">
                  <table className="table table-bordered table-hover mb-4">
                    <thead className="bg-dark">
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Items Qty</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="py-5">
                          <td>{order._id}</td>
                          <td className={order.orderStatus === "Shipped" && "Delivered" ? "text-success" : "text-danger"}>
                            {order.orderStatus}
                          </td>
                          <td>{order.orderItems.reduce((totalQty, item) => totalQty + item.quantity, 0)}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            <Link to={`/order/${order._id}`} className="btn btn-primary btn-sm">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
