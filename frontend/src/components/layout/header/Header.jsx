import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutIcon from '@mui/icons-material/Logout';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import "./Header.css";
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom';
import { loadUser, logout } from '../../../actions/user_action';
import { useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.userInfo)

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("you are Logged out successfully!")
    navigate('/login');
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Ishop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link mx-lg-3 mx-md-0 mx-sm-0 mx-0" to="/" data-bs-toggle="collapse" data-bs-target="#navbarNav">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-3 mx-md-0 mx-sm-0 mx-0" to="/products" data-bs-toggle="collapse" data-bs-target="#navbarNav">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/orders" data-bs-toggle="collapse" data-bs-target="#navbarNav">Orders</Link>
            </li>
          </ul>
          <SearchBar />
          <Link to="/cart" className="btn btn-outline-light mx-lg-5 mx-md-0 mx-sm-0 mx-0 my-lg-0 my-md-3 my-sm-3 my-3">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <div className="dropdown btn-outline-light my-1 me-5">
            <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faUser} /> Profile
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {isAuthenticated === true ? (
                <>
                  {user.role === "admin" && (<li><Link className="dropdown-item my-2  " to="/admin/dashboard">Dashboard</Link></li>)}
                  <li><Link className="dropdown-item my-2  " to="/profile">My Profile</Link></li>
                  <li><Link className="dropdown-item my-2 " to="/orders">My Orders</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li className="dropdown-item my-2 ">
                    <button className="nav-link" onClick={handleLogout}>Logout<LogoutIcon className="ms-2"/></button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item " to="/login">Login</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item " to="/signup">Sign-up</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;
