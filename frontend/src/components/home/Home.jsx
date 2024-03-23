import React, { useEffect } from 'react';
import { clearErrors, getAllProducts } from "../../actions/product_action";
import { useDispatch, useSelector } from "react-redux";
import HomeCover from '../layout/homeCover/HomeCover';
import ProductCard from "../layout/ProductCard/ProductCard"
import MetaData from '../layout/metaData/MetaData';
import Loader from '../layout/loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import("./Home.css");

function Home() {
  const dispatch = useDispatch();

  // Destructuring state values properly
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      toast.error("Error in fetching all products");
      dispatch(clearErrors());
    }
    dispatch(getAllProducts());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Ishop" />

      <div >

        <HomeCover />


        <h1 className="text-center mt-5">Featured Products</h1>
        {
          loading ? <Loader /> : <div className="container  mt-5 text-center">
            <div className="row">
              {/* Mapping through products with unique key */}
              {products && products.map(product => (
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 my-5 mx-auto">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Home;
