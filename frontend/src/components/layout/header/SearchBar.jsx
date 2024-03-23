import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'; 

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      // Use SweetAlert to display the modal
      swal.fire({
        icon: 'error',
        title: 'No Keyword Entered',
        text: 'Please enter a keyword to search.',
        confirmButtonText: 'Close'
      });
      navigate("/products")
    }
  };

  return (
    <form className="d-flex" onSubmit={searchSubmitHandler}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn btn-outline-light">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
