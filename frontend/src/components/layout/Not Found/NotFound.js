import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh" }}
    >
      <ErrorIcon sx={{ fontSize: 200, color: "error.main" }} />
      <Typography variant="h3" gutterBottom className="my-4">
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" size="large" className="mt-4">
          Go to Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
