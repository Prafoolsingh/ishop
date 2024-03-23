import RatingStars from 'react-rating-stars-component';
import React from "react";
import profilePng from "../../images/Profile.png";
import "./ProductDetails.css"


const ReviewCard = ({ review }) => {

  
  const options = {
    value: review.rating,
    readOnly: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 23,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <RatingStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;