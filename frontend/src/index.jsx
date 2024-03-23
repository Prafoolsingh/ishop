import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <Provider store={store}>
    <ToastContainer className="mt-5" />
    <App />
  </Provider>

);
