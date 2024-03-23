import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Products from './components/product/Products';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Profile from './components/user/Profile';
import { loadUser } from './actions/user_action';
import UpdatePassword from './components/user/updatePassword';
import ProtectedRoute from './components/route/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProfile from './components/user/UpdateProfile';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import PaymentOrder from './components/cart/PaymentOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from './components/orders/MyOrders';
import OrderDetails from './components/orders/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import NewProduct from './components/Admin/NewProduct';
import AdminHeader from './components/layout/header/AdminHeader';
import OrderList from './components/Admin/OrderList';
import UpdateOrders from './components/Admin/UpdateOrders';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import AboutUs from './components/layout/About/AboutUs';
import NotFound from './components/layout/Not Found/NotFound';
import Contact from './components/layout/Contact/Contact';
import ScrollToTop from './components/ScrollToTop';
import UpdateProduct from './components/Admin/UpdateProduct';
import Cookies  from "js-cookie";
function App() {

  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.userInfo)

  axios.defaults.withCredentials = true;

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {

    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
    
  }

  useEffect(() => {
  
      dispatch(loadUser());
      getStripeApiKey();
   
  }, [dispatch]);


  return (
    <Router>

      <ScrollToTop />

      {isAuthenticated && user.role === "admin" ? <AdminHeader /> : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/profile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

        <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:reset_token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />

        <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />

        {/* Payment route */}
        <Route path="/order/payment" element={<ProtectedRoute>

          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PaymentOrder />
            </Elements>)}

        </ProtectedRoute>} />


        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

        <Route path="/order/:_id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />


        {/* admin routes */}

        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} ></Route>


        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} ></Route>


        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} ></Route>


        <Route path="/admin/product/:_id" element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} ></Route>

        <Route path="/admin/product/create" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} ></Route>

        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} ></Route>


        <Route path="/admin/order/:_id" element={<ProtectedRoute isAdmin={true}><UpdateOrders /></ProtectedRoute>} ></Route>


        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} ></Route>

        <Route path="/admin/user/:_id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} ></Route>

        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews /></ProtectedRoute>} ></Route>


        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
