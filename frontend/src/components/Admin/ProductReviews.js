import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllReviews, deleteReviews } from "../../actions/product_action";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";
import MetaData from "../layout/metaData/MetaData";
import { DELETE_REVIEW_RESET } from "../../constants/product_constant";
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteReview);

  const { error, reviews, loading } = useSelector((state) => state.productReviews);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Dispatch deleteReviews action
        await dispatch(deleteReviews(reviewId, productId));

      }
    });
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);


  return (
    <>
      <MetaData title={`All Reviews - Admin`} />
      <div className="dashboard">
        <div className="container min-vh-100">
          <div className="row">
            <div className="col-lg-4 mx-auto shadow-lg p-5 mt-5">
              <form className="productReviewsForm" onSubmit={productReviewsSubmitHandler}>
                <h2 className="text-center py-3" style={{ color: '#007bff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>All Reviews</h2>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <Button
                  id="createProductBtn"
                  type="submit"
                  className="btn btn-primary mt-3 w-100"
                  disabled={loading || productId === ""}
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
          {reviews && reviews.length > 0 ? (
            <div className="row my-5 text-center">
              <div className="col">
                <div className="table-responsive shadow p-3 mb-5 bg-white rounded">
                  <Table striped bordered hover className="productListTable mt-3">
                    <thead>
                      <tr>
                        <th>Review ID</th>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((item) => (
                        <tr key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.comment}</td>
                          <td className={item.rating >= 3 ? "text-success" : "text-danger"}>{item.rating}</td>
                          <td>
                            <Button className="btn btn-danger" onClick={() => deleteReviewHandler(item._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          ) : (
            <p className="alert alert-warning fw-bold text-center mt-5">No Reviews Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
