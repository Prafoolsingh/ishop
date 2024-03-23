import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { clearErrors, getUserDetails, updateUser } from "../../actions/user_action";
import MetaData from "../layout/metaData/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faUserTag, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER_RESET } from "../../constants/user_constants";
import { toast } from "react-toastify";
import Loader from "../layout/loader/Loader.jsx";

const UpdateUser = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.adminUserDetails);
  const {  error: updateError, isUpdated } = useSelector((state) => state.adminUpdateusers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== _id) {
      dispatch(getUserDetails(_id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, user, _id,updateError]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(_id, formData));
  };

  return (
    <>
      <MetaData title="Update User" />
      {loading ? (
        <Loader />
      ) : (
        <div className="container my-5 vh-100">
          <div className="row">
            <div className="col-lg-6 mx-auto p-5">
              <form className="update-user-form shadow p-4" onSubmit={updateUserSubmitHandler}>
                <h3 className="text-center mb-4 text-primary">Update User</h3>
                <hr className="mx-5 px-5 my-4 text-primary bg-primary" />
                <div className="my-5 input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ fontFamily: 'Arial', fontSize: '16px' }}
                  />
                </div>
                <div className="mb-5 input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ fontFamily: 'Arial', fontSize: '16px' }}
                  />
                </div>
                <div className="mb-5 input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUserTag} />
                  </span>
                  <select
                    className="form-select"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    style={{ fontFamily: 'Arial', fontSize: '16px' }}
                  >
                   
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100"
                  style={{ fontFamily: 'Arial', fontSize: '16px', backgroundColor: '#007bff' }}
                >
                  {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Update User"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
