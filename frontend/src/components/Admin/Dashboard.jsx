import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../actions/product_action.js";
import { getAllOrders } from "../../actions/order_action.js";
import MetaData from "../layout/metaData/MetaData.jsx";
import { getAllUsers } from "../../actions/user_action.js";
import { Doughnut, Line } from "react-chartjs-2";
import Loader from "../layout/loader/Loader.jsx";
import {
  Chart as ChartJS,
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";

ChartJS.register(
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.adminGetproducts);
  const { orders } = useSelector((state) => state.adminAllOrders);
  const { users } = useSelector((state) => state.adminAllUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [0, totalAmount],
      },
    ],
    options: {
      scales: {
        x: {
          type: "category",
          labels: ["Initial Amount", "Amount Earned"],
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <MetaData title="Dashboard - Admin Panel" />
          <Container>
            <Row>
           
                  <Col md={6}>
                    <div className="shadow mt-5 p-4 bg-white rounded text-center ">
                      <h5>Total Amount</h5>
                      <Typography variant="h4" fontWeight="bold">
                        ${totalAmount}
                      </Typography>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="shadow mt-5 p-4 bg-white rounded text-center">
                      <Link to="/admin/products" className="text-decoration-none">
                        <h5>Products</h5>
                        <Typography variant="h4" fontWeight="bold" color="#007bff">
                          {products && products.length}
                        </Typography>
                      </Link>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="shadow mt-5 p-4 bg-white rounded text-center">
                      <Link to="/admin/orders" className="text-decoration-none">
                        <h5>Orders</h5>
                        <Typography variant="h4" fontWeight="bold">
                          {orders && orders.length}
                        </Typography>
                      </Link>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="shadow mt-5 p-4 bg-white rounded text-center">
                      <Link to="/admin/users" className="text-decoration-none">
                        <h5>Users</h5>
                        <Typography variant="h4" fontWeight="bold">
                          {users && users.length}
                        </Typography>
                      </Link>
                    </div>
                  </Col>
                </Row>
                <Row className="my-5">
                    <Col md={6}>
                      <div className="d-flex justify-content-center mt-5 shadow p-5 bg-white rounded" style={{ height: "350px" }}>
                        <Line data={lineState} />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-flex justify-content-center mt-5 shadow p-5 bg-white rounded" style={{ height: "350px" }}>
                        <Doughnut data={doughnutState} />
                      </div>
                    </Col>
                
              </Row>
            </Container>
          </div>
        )}
      </>
    );
};

export default Dashboard;
