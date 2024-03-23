import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, Alert } from "react-bootstrap";
import MetaData from "../layout/metaData/MetaData";
import { deleteOrder, getAllOrders, clearErrors } from "../../actions/order_action";
import { DELETE_ORDER_RESET } from "../../constants/order_constant";
import { toast } from "react-toastify";
import Loader from "../layout/loader/Loader";
import Swal from 'sweetalert2';

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders, loading } = useSelector((state) => state.adminAllOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.adminUpdateOrder);

  const deleteOrderHandler = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(_id));
      }
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <>
      <MetaData title={`All Orders - Admin`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="container my-5 vh-100">

          <h1 className="text-center my-5 fw-bold" style={{ color: '#007bff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>All Orders</h1>
   
          {orders.length === 0 ? (
            <div className="nofound mt-5 vh-100">
              <Alert variant="info" className="text-center mt-5">
                No orders found
              </Alert>
            </div>
          ) : (
            <div className="table-responsive shadow p-3 mb-5 bg-white rounded">

              <Table striped bordered hover responsive>
                <thead className="table-responsive shadow p-3 mb-5 bg-white rounded table-dark">
                  <tr>
                    <th className="fw-bold">Order ID</th>
                    <th className="fw-bold">Status</th>
                    <th className="fw-bold">Items Qty</th>
                    <th className="fw-bold">Amount</th>
                    <th className="fw-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.orderItems.length}</td>
                      <td>${item.totalPrice}</td>
                      <td>
                        <Link to={`/admin/order/${item._id}`} className="btn btn-primary me-2">
                          View
                        </Link>
                        <Button variant="danger" onClick={() => deleteOrderHandler(item._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderList;
