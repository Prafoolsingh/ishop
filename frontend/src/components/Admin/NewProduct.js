import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createAdminProduct } from "../../actions/product_action";
import MetaData from "../layout/metaData/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faTags, faFileSignature, faDollar, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from "../../constants/product_constant.js";
import { toast } from "react-toastify";
import "./NewProduct.css";
import Loader from "../layout/loader/Loader.jsx";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.adminNewProduct);

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
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('description', description);
    images.forEach(image => {
      formData.append('images', image);
    });

    dispatch(createAdminProduct(formData));
  };

  const changeImageHandler = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagesPreview(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <MetaData title="Create Product" />

          <div className="container">
            <div className="row">


              <div className="col-lg-6 mx-auto col-md-12 col-sm-18 col-12 ">

                <form className=" px-lg-5 px-md-5 px-sm-5 px-3 pt-5 pb-4 shadow-lg"  onSubmit={createProductSubmitHandler}>

                  <h3 className="text-center mb-4 text-primary" >Create Product</h3>
                  <hr className="mx-5 px-5 my-4 text-primary bg-primary" />
                  <div className="my-4 input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faFileSignature} />
                    </span>
                    <input
                      type="text"
                      className="form-control "
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
                    <span className="input-group-text"> <FontAwesomeIcon icon={faTags} className="me-3" /></span>
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
                      onChange={changeImageHandler}
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
                    disabled={loading ? true : false}
                    className="btn btn-primary w-100"
                  >
                    Create Product
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

export default NewProduct;
