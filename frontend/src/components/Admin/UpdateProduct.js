import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, updateAdminProduct } from "../../actions/product_action";
import MetaData from "../layout/metaData/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature, faDollar, faTags, faAlignLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PRODUCT_RESET } from "../../constants/product_constant.js";
import { toast } from "react-toastify";
import Loader from "../layout/loader/Loader.jsx";
import "./NewProduct.css";

const UpdateProduct = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.adminUpdateProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Mens",
    "Womens",
    "Kids",
    "Electronics"
  ];

  useEffect(() => {
    if (!product || product._id !== _id) {
      dispatch(getProductDetails(_id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setImagesPreview(product.images.map(image => image.url));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isUpdated, navigate, _id, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    images.forEach((image) => formData.append("images", image)); // Append images to formData
    dispatch(updateAdminProduct(_id, formData));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Set selected images
    setImagesPreview(files.map(file => URL.createObjectURL(file))); // Set image previews
  };

  return (
    <>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Product" />

          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto col-md-12 col-sm-18 col-12 ">
                <form className="px-lg-5 px-md-5 px-sm-5 px-3 pt-5 pb-4 shadow-lg newProductForm" onSubmit={updateProductSubmitHandler}>
                  <h3 className="text-center mb-4 text-primary">Update Product</h3>
                  <hr className="mx-5 px-5 my-4 text-primary bg-primary" />
                  <div className="my-4 input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faFileSignature} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faDollar} className="me-3" />
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faTags} className="me-3" />
                    </span>
                    <select
                      className="form-select"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faAlignLeft} className="me-3" />
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Stock"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPen} className="me-3" />
                    </span>
                    <textarea
                      className="form-control"
                      style={{ resize: "none" }}
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="mb-4 input-group">
                    <input
                      type="file"
                      className="form-control"
                      name="images"
                      accept="image/*"
                      onChange={updateProductImagesChange}
                      multiple
                    />
                  </div>
                  <div className="mb-1 image-preview-container">
                    {imagesPreview.map((image, index) => (
                      <div key={index} className="image-preview-wrapper">
                        <img
                          src={image}
                          alt="Product Preview"
                          className="img-fluid image-preview"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-100"
                  >
                    Update Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
