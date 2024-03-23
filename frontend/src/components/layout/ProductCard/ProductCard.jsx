import React from 'react';
import RatingStars from 'react-rating-stars-component';
import { ShoppingCart } from '@mui/icons-material';
import "./ProductCard.css";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../../actions/cart_action'; // Assuming this is the correct path to your action
import { toast } from 'react-toastify';
const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };


  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemsToCart(product._id));
    toast.success("Item added to card ")
   }

  return (
    <div className="product card">
      <Link to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} className='product-image card-img-top' />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h6 className="card-title">{product.name}</h6>
        </Link>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <span><RatingStars {...options} /></span>
          <span>({product.numOfReviews})</span>
        </div>
        <p className='price text-danger'>
          <span className="currency-symbol">$ </span>
          {product.price}
        </p>
       
          <button
            className="btn border"
            onClick={handleAddToCart}
            disabled={product.stock < 1 }
          >
            Add to Cart <ShoppingCart />
          </button>
        
      </div>
    </div>
  );
}

export default ProductCard;
