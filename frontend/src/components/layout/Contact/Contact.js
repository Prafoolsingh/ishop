import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";
import {Link} from 'react-router-dom';

const Contact = () => {
  
  return (
    <div className="contactContainer">
      <Link className="mailBtn" href="mailto:singhpraful61@gmail.com">
        <Button>Contact: singhpraful61@gmail.com</Button>
      </Link>
    </div>
  );
};

export default Contact;
