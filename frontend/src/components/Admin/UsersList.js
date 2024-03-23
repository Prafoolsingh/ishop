import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import MetaData from "../layout/metaData/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/user_action";
import { DELETE_USER_RESET } from "../../constants/user_constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; 
import { Alert } from "react-bootstrap";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.adminAllUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.adminUpdateusers);

  const deleteUserHandler = (id) => {
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms deletion, dispatch delete action
        dispatch(deleteUser(id));
      }
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message, navigate]);

  return (
    <>
      <MetaData title={`All uses - Admin`} />

      <div className="container min-vh-100 ">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center my-5 fw-bold" style={{ color: '#007bff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>All Users</h1>

            {users.length === 0 ? (
              <Alert variant="info" className="text-center">
                No users found.
              </Alert>
            ) : (
              <div className="table-responsive shadow p-3 mb-5 bg-white rounded">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th className="fw-bold">User ID</th>
                      <th className="fw-bold">Email</th>
                      <th className="fw-bold">Name</th>
                      <th className="fw-bold">Role</th>
                      <th className="fw-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td className={user.role === "admin" ? "text-success fw-bold" : "text-danger fw-bold"}>{user.role}</td>
                        <td>
                          <Link to={`/admin/user/${user._id}`} className="btn btn-outline-info me-2">
                            <EditIcon />
                          </Link>
                          <Button onClick={() => deleteUserHandler(user._id)} className="">
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    
    </>
  );
};

export default UsersList;
