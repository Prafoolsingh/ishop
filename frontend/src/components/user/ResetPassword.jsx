import React, { useState, useEffect } from "react";
import Loader from '../layout/loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/user_action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from "../layout/metaData/MetaData";

import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { reset_token } = useParams(); // Using useParams hook to get parameters from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, loading } = useSelector(
    (state) => state.forgotResetPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(reset_token, myForm)); // Using reset_token obtained from useParams
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      setNewPassword("")
      setConfirmPassword("")
    }

    if (success) {
      toast.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-5 shadow-lg p-5">
                <h2 className="text-center mb-5">Reset Password</h2>
                <hr className="mx-5 mb-5"/>
                <form className="resetPasswordForm" onSubmit={handleSubmit}>
                  <div className="input-group my-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-group my-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 my-3">Update</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
