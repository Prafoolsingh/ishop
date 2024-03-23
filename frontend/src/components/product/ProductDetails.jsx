import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/product_action';
import './ProductDetails.css';
import Loading from "../layout/loader/Loader";
import { Rating } from "@mui/material";
import Carousel from 'react-bootstrap/Carousel';
import ReviewCard from './ReviewCard';
import { toast } from 'react-toastify';
import MetaData from "../layout/metaData/MetaData.jsx"
import { addItemsToCart } from '../../actions/cart_action.js';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { NEW_REVIEW_RESET } from '../../constants/product_constant.js';

function ProductDetails() {

  const { _id } = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);

  const { success, error: reviewError } = useSelector(
    (state) => state.productNewReview
  );

  const { product, loading, error } = productDetails;

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  useEffect(() => {
    if (error) {
      toast.error("Error in fetching product details!");
      dispatch(clearErrors())
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(_id));
  }, [dispatch, _id, error, reviewError, success]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {

    if (product.stock <= quantity) return;
    const quanti = quantity + 1;
    setQuantity(quanti);

  };

  const decreaseQuantity = () => {

    if (1 >= quantity) return;
    const quanti = quantity - 1;
    setQuantity(quanti);
  };

  const handleAddToCart = () => {
    dispatch(addItemsToCart(_id, quantity))
    toast.success("Item added to card ")
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleSubmitReview = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", _id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  return (

    loading ? <Loading /> : (

      <>
        <MetaData title={`${product.name} || Ishop`} />

        <div className='container mt-5'>

          <div className='row g-5'>

            <div className="col-md-6">

              <Carousel indicators controls={true} prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: 'black' }}></span>} nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: 'black' }}></span>}>

                {product &&
                  product.images &&
                  product.images.map((item, i) => (
                    <Carousel.Item key={item.url}>
                      <div className="card">
                        <img
                          className="card-img-top carouselImage img-fluid"
                          src={item.url}
                          alt={`Slide ${i}`}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-md-6 flex-column align-items-center">
              <div className="card">
                <div className="card-body mx-lg-0 mx-md-0 mx-sm-auto">
                  <h4 className="card-title ">{product.name}</h4>
                  <p className="card-text">Product #{product._id}</p>


                  <div className="rating-wrapper">
                    <span className="rating-stars"><Rating {...options} /></span>
                    <span className="num-reviews">({product.numOfReviews} Reviews)</span>
                  </div>

                  <div className="product-price">

                    <div className="priceQuantity d-flex ">
                      <h4 className="card-title mb-2 mt-2">$ {product.price}</h4>

                      <div className="quantity-control ms-5">

                        <button className="quantity-btn minus" onClick={decreaseQuantity}>-</button>

                        <input type="number" readOnly className="quantity-input" value={quantity} />

                        <button className="quantity-btn plus" onClick={increaseQuantity}>+</button>

                      </div>
                    </div>

                    <p className={`stock-status card-text ${product.stock < 1 ? 'text-danger mt-3' : 'text-success mt-3'}`}>

                      {product.stock < 1 ? "Out of stock" : "In stock"}

                    </p>

                    <hr />

                    <div className='mb-3'>
                      <h4>Description:</h4>
                      <p className="card-text">{product.description}</p>
                    </div>


                    <button disabled={product.stock < 1 ? true : false} className="btn myBtn add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>

                    <button className="btn myBtn ms-3" onClick={submitReviewToggle}>Submit Review</button>

                  </div>



                </div>
              </div>
            </div>
          </div>

          {/* review dialog */}

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
            className="custom-dialog"
          >
            <DialogTitle className="modal-title text-center">Submit Review</DialogTitle>
            <DialogContent className="modal-body">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                className='text-center'
              />
              <textarea
                className="form-control submitDialogTextArea mt-3"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
              ></textarea>
            </DialogContent>
            <DialogActions className="modal-footer">
              <Button onClick={submitReviewToggle} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmitReview} variant="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>



          <div className="row mt-5">
            <div className="col">
              <h3 className='reviewsHeading'>Reviews</h3>
            </div>
          </div>


          <div className="row">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div className="col-lg-4 col-md-4 col-sm-4 col-6" key={index}>
                  <ReviewCard review={review} />
                </div>
              ))
            ) : (
              <div className="col">
                <p className='noReviews'>No Reviews yet</p>
              </div>
            )}
          </div>

        </div>
      </>
    )
  );
}

export default ProductDetails;
