import React, { useState } from 'react';

const ProductsTab = ({ products, onAdd, onEdit, onDelete }) => {
  const [newProduct, setNewProduct] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.trim()) {
      onAdd({ name: newProduct });
      setNewProduct('');
    }
  };

  return (
    <div>
      <h4>Manage Products</h4>

      <form onSubmit={handleSubmit} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter new product name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>

      <ul className="list-group">
        {products.map((product, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {product.name}
            <div>
              <button 
                className="btn btn-sm btn-primary me-2"
                onClick={() => {
                  const updatedName = prompt('Enter new name:', product.name);
                  if (updatedName) {
                    onEdit(index, { name: updatedName });
                  }
                }}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsTab;
