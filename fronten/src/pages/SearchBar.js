import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, cartLength, onCartClick, disabled }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
      <Form.Control
        type="text"
        placeholder="Search Plants..."
        className="shadow border-0 me-3 mb-2"
        style={{ maxWidth: '300px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
      />
      
    </div>
  );
};

export default SearchBar;
