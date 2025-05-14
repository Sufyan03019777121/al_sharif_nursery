import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ newProduct, handleInputChange, handleImageChange, handleAddOrUpdateProduct }) => {
  return (
    <div>
      <h4>{newProduct._id ? 'Edit' : 'Add'} Product</h4>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formImageUrl1">
          <Form.Label>Image URL 1</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.images[0]}
            onChange={(e) => handleImageChange(0, e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImageUrl2">
          <Form.Label>Image URL 2</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.images[1]}
            onChange={(e) => handleImageChange(1, e.target.value)}
          />
        </Form.Group>

        {newProduct.images.map((img, index) => (
          img && (
            <div key={index} className="mt-2">
              <img src={img} alt={`Preview ${index}`} style={{ width: '100px', height: '100px' }} />
            </div>
          )
        ))}

        <Button className="mt-3" onClick={handleAddOrUpdateProduct}>
          {newProduct._id ? 'Update' : 'Add'} Product
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
