import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, Alert } from "react-bootstrap";
import MetaData from "../layout/metaData/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteAdminProduct, getAdminProducts } from "../../actions/product_action";
import { DELETE_PRODUCT_RESET } from "../../constants/product_constant";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Loader from '../layout/loader/Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products, loading } = useSelector((state) => state.adminGetproducts);
  const { error: deleteError, isDeleted } = useSelector((state) => state.adminUpdateProduct);

  const deleteProductHandler = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdminProduct(_id));
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
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`All Products - Admin`} />

          <div className="container mt-3 text-center min-vh-100">
            <div className="row">
              <h1 className="my-5 text-center fw-bold" style={{ color: '#007bff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>ALL PRODUCTS</h1>
              <div className="col-md-12">

                <div className="table-responsive">
                  {products && products.length > 0 ? (
                    <div className="table-responsive shadow p-3 mx-0 mx-lg-5 mx-md-5 mx-sm-0 mt-2 bg-white rounded">
                      <Table striped bordered hover responsive>
                        <thead className="table-dark ">
                          <tr>
                            <th className="fw-bold">Product ID</th>
                            <th className="fw-bold">Name</th>
                            <th className="fw-bold">Stock</th>
                            <th className="fw-bold">Price</th>
                            <th className="fw-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((item) => (
                            <tr key={item._id}>
                              <td>{item._id}</td>
                              <td>{item.name}</td>
                              <td>{item.stock}</td>
                              <td>${item.price}</td>
                              <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/admin/product/${item._id}`} className="btn btn-primary me-2">
                                  <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Button variant="danger" onClick={() => deleteProductHandler(item._id)}>
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div className="mt-5 vh-100">
                      <Alert variant="info">
                        No products found
                      </Alert>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductList;
