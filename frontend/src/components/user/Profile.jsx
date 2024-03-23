import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/metaData/MetaData";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="container my-5">
          <div className="row justify-content-center my-5">
            <div className="col-lg-6 col-md-8 col-sm-12 mt-2">
              <div className="card shadow">
                <div className="card-body">
                  <div className="text-center ">

                    <img src={user.avatar.url} className="img-fluid rounded-circle profile-image" alt={user.name} />

                  </div>
                  <div className="text-center mb-3">
                    <h2 className="my-4">{user.name}</h2>
                    <p className="text-muted my-4">{user.email}</p>
                    {user.createdAt && (
                      <p className="text-muted mt-2">Joined On: {new Date(user.createdAt).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="btn-group" role="group" aria-label="Profile Actions">
                      <Link to="/profile/update" className="btn btn-primary me-3">Edit Profile</Link>
                      <Link to="/password/update" className="btn btn-danger">Change Password</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
