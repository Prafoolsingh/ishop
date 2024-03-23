import React, { useState, useEffect } from "react";
import Loader from "../layout/loader/Loader"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/user_action";
import MetaData from "../layout/metaData/MetaData";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector(
        (state) => state.forgotResetPassword
    );

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));

        setEmail("")
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message);
        }
    }, [error,dispatch,message]);

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <MetaData title="Forgot Password" />
                    <div className="container my-5">
                        <div className="row justify-content-center">
                            <div className="col-md-5 shadow-lg p-5">
                                <h2 className="text-center mb-5">Forgot Password</h2>

                                <hr className="mx-5 mb-5"/>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><MailOutlineIcon /></span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter registered email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 my-3">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ForgotPassword;
