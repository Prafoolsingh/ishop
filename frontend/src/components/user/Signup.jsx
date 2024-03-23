import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, register } from '../../actions/user_action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import "./LogSin.css";
import BackgroundImage from "../../images/background.png";
import MetaData from '../layout/metaData/MetaData';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });

  const { name, email, password, avatar } = formData;

  const [avatarPreview, setAvatarPreview] = useState('https://cdn1.iconfinder.com/data/icons/social-media-2057/128/1-47-512.png');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isAuthenticated } = useSelector((state) => state.userInfo);

  const profilePic = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };


  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Registration successful!");
      dispatch(loadUser())
      navigate("/");
    }
    if (error) {
      toast.error(error)
    }
  }, [error, navigate, isAuthenticated, dispatch]);

  const handleProfileClick = () => {
    profilePic.current.click();
  };

  return (
    <>
      <MetaData title="SignUp" />
      {loading ? (
        <Loader />
      ) : (
        <div className="sign-in__wrapper shadow-lg" style={{ backgroundImage: `url(${BackgroundImage})` }}>
          <form className="shadow p-3 bg-white rounded" onSubmit={handleSubmit}>
            <h3 className="my-3 text-center">Register</h3>
            <hr className='mx-5' />
            <div className="Profilepage-Image-Container text-center my-4 cursor-pointer" style={{ height: '60px' }} onClick={handleProfileClick}>
              <img src={avatarPreview} alt='Profile' className='rounded-circle img-fluid h-100' />
            </div>
            <input type="file" accept="image/*" id="avatar"
              ref={profilePic}
              className='my-3'
              name="avatar"
              onChange={handleChange}
              multiple={false}
              style={{ display: "none" }} />
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-user fa-lg me-3 fa-fw"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope fa-lg me-3 fa-fw"></i></span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock fa-lg me-3 fa-fw"></i></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  name="password"
                  minLength="8"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-1 mb-lg-4">
              <button type="submit" className="btn btn-dark w-100">Register</button>
            </div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
