import React, {useState, useEffect } from "react";
import Loader from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/user_action";
import { UPDATE_PASSWORD_RESET } from "../../constants/user_constants";
import MetaData from "../layout/metaData/MetaData";

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully");
      navigate("/profile");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="container my-5">
            <div className="row justify-content-center mt-3">
              <div className="col-md-6">
                <div className="card bg-body-tertiary">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-4">Change Password</h2>
                    <hr  className="mx-5 mb-5"/>
                    <form onSubmit={updatePasswordSubmit}>
                      <div className="form-group mt-3">
                        <label className="mb-2" htmlFor="oldPassword">Old Password</label>
                        <input
                          type="password"
                          id="oldPassword"
                          className="form-control bg-body-secondary"
                          placeholder="Enter old password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label className="mb-2" htmlFor="newPassword">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          className="form-control bg-body-secondary"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label className="mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control bg-body-secondary"
                          placeholder="confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block my-4 w-100">
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
