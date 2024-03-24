import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllProducts } from '../../actions/product_action';
import ProductCard from '../layout/ProductCard/ProductCard';
import Loader from '../layout/loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import RatingStars from 'react-rating-stars-component';
import MetaData from "../layout/metaData/MetaData.jsx"

const categories = [
  "Mens",
  "Womens",
  "Kids",
  "Electronics"
];

function Products() {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { products, error, loading, productCount, resultPerPage } = useSelector(state => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0)

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const setCurrentPageNo = (e, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const totalNumberOfPages = Math.ceil(productCount / resultPerPage);

  const categoryHandler = (e) => {

    setCategory(e.target.value);
  };

  const ratingsHandler = (newRating) => {
    setRatings(newRating)
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (keyword) {
      dispatch(getAllProducts(keyword, currentPage));
    } else {
      dispatch(getAllProducts('', currentPage, price, category, ratings));
    }
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (

        <>

          <MetaData title="Ishop Products" />
          <div className="container mt-5">

            <div className="row">

              <div className="col-md-3">

                {/* category filter */}
                <aside className="category-filter px-3 border pt-5 pb-4 mt-3 shadow-sm">
                  <Typography variant="h6" gutterBottom className="text-center ">Categories</Typography>
                  <select className="form-select" value={category} onChange={categoryHandler}>
                    <option value="">All</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </aside>


                {/* ratings filter */}
                <aside className="category-filter mt-5 px-3 border p-1 shadow-sm">
                  <Typography component="legend" className="text-center">Ratings Above</Typography>
                  <div className='d-flex justify-content-center'>
                    <RatingStars
                      count={5}
                      size={37}
                      activeColor="#ffd700"
                      isHalf={false}
                      value={ratings}
                      onChange={ratingsHandler}
                    />
                  </div>
                </aside>

                {/* price filter */}
                <aside className="price-filter mt-5 px-3 border p-1 shadow-sm">
                  <Typography variant="h6" gutterBottom className="text-center">Filter by Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={10000}
                  />
                </aside>

              </div>


              {/* Products rendering */}
              {products && products.map(product => (
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 my-3 mx-auto text-center">
                  <ProductCard product={product} />
                </div>
              ))}

            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center my-5">
              <Stack spacing={2}>
                {totalNumberOfPages > 1 && (
                  <Pagination
                    count={totalNumberOfPages}
                    page={currentPage}
                    onChange={setCurrentPageNo}
                    variant="outlined"
                    shape="rounded"
                  />
                )}
              </Stack>
            </div>

          </div>
        </>

      )}
    </>
  );
}

export default Products;
