import React from 'react';
import banner1 from "../../../images/carousel1.PNG"
import banner2 from "../../../images/carousel2.PNG"
import banner3 from "../../../images/carousel3.PNG"
const HomeCover = () => {
  return (

    <div className="container mt-5 homeCover">

      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        {/* <!-- Indicators/dots --> */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"

            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* <!-- The slideshow/carousel --> */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={banner2}
              alt="banner"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src={banner3}
              alt="banner"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src={banner1}
              alt="banner"
              className="d-block w-100"
            />
          </div>
        </div>

        {/* <!-- Left and right controls/icons --> */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default HomeCover;
