import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Header.css";
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/user_action';
import { useDispatch } from "react-redux";

const AdminHeader = () => {
  const [isTogglerOpen, setIsTogglerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("you are Logged out successfully!")
    navigate('/login');
  };

  const handleLinkClick = () => {
    setIsTogglerOpen(false); // Close the toggler menu when a link is clicked
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Ishop</Link>
        <button className="navbar-toggler" type="button" onClick={() => setIsTogglerOpen(!isTogglerOpen)} aria-expanded={isTogglerOpen ? "true" : "false"}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isTogglerOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link onClick={handleLinkClick} className="nav-link mx-lg-3 mx-md-0 mx-sm-0 mx-0" to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLinkClick} className="nav-link mx-lg-3 mx-md-0 mx-sm-0 mx-0" to="/admin/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLinkClick} className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/product/create">Create Products</Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLinkClick} className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLinkClick} className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLinkClick} className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/reviews">Reviews</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link btn mx-lg-4 mx-md-0 mx-sm-0 mx-0">Logout<LogoutIcon/></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader;
