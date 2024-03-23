import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors, loadUser } from '../../actions/user_action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import "./LogSin.css";
import BackgroundImage from "../../images/background.png";
import MetaData from '../layout/metaData/MetaData';
import Swal from 'sweetalert2';
import { UPDATE_PROFILE_RESET } from '../../constants/user_constants';

const UpdateProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profilePic = useRef(null); 

  const { user } = useSelector((state) => state.userInfo);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://cdn1.iconfinder.com/data/icons/social-media-2057/128/1-47-512.png");

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);
        dispatch(updateProfile(formData));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile updated Successfully")
      dispatch(loadUser());
      navigate('/profile');
      dispatch({ type: UPDATE_PROFILE_RESET });
    } 
  }, [dispatch, error, user, isUpdated, navigate]);

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
            <h3 className="my-3 text-center">Update Profile</h3>
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
                  onChange={(e) => setName(e.target.value)} // fixed onChange for name
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
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <input
                type="submit"
                value="Update"
                className="updateProfile btn btn-dark w-100"
              />
            </div>


          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;

