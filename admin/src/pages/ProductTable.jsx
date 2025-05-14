import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ProductTable = ({ products, handleEditProduct, handleDeleteProduct, searchQuery }) => {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h4>Product List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Images</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>
                {product.images?.map((img, index) => (
                  <Image key={index} src={img} thumbnail style={{ width: '40px', height: '40px', marginRight: '5px' }} />
                ))}
              </td>
              <td>{product.title}</td>
              <td className="text-truncate" style={{ maxWidth: '100px' }}>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEditProduct(product)} className="me-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
