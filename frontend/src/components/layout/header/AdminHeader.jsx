import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Header.css";
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/user_action';
import { useDispatch } from "react-redux";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("you are Logged out successfully!")
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Ishop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar" aria-controls="adminNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link mx-lg-3 mx-md-0 mx-sm-0 mx-0" to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-3 mx-md-0 mx-sm-0 mx-0" to="/admin/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/product/create">Create Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-4 mx-md-0 mx-sm-0 mx-0" to="/admin/reviews">Reviews</Link>
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
