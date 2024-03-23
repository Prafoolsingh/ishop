
import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";

import { Link, useNavigate } from 'react-router-dom';

import "./LogSin.css";

import { useDispatch, useSelector } from "react-redux";

import { login, clearErrors, loadUser } from "../../actions/user_action";

import BackgroundImage from "../../images/background.png";

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import Loader from "../layout/loader/Loader"
import MetaData from "../layout/metaData/MetaData";


const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector((state) => state.userInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }



  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success(`Logged in successfully`)
      dispatch(loadUser())
      navigate(`/`)
    } 
  }, [dispatch, error, isAuthenticated, navigate]);



  return (
    <>
      <MetaData title="Login | Ishop" />
      {loading ? <Loader /> :
        <div
          className="sign-in__wrapper shadow-lg"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          <div className="sign-in__backdrop"></div>
          <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
            <div className="h4 mb-2 text-center">Sign In</div>
            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
       
            <div className="mt-3 text-center">
  <div className="mb-2">
    Don't have an account? <Link to="/signup" className="text-decoration-none">Register</Link>
  </div>
  <div>
    <Link to="/password/forgot" className="text-decoration-none">Forgot Password?</Link>
  </div>
</div>

         
          </Form>
        </div>}
    </>
  );
};

export default Login;
