import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    images: ['', ''],
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index] = value;
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) {
      alert('Title اور Price لازمی ہیں!');
      return;
    }

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setNewProduct({
      title: '',
      description: '',
      price: '',
      images: ['', ''],
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewProduct(products[index]);
  };

  const handleDelete = (index) => {
    if (window.confirm('کیا آپ واقعی delete کرنا چاہتے ہیں؟')) {
      const updated = [...products];
      updated.splice(index, 1);
      setProducts(updated);
    }
  };

  return (
    <div className="container mt-4">
      <h3>{editIndex !== null ? 'Edit' : 'Add'} Product</h3>
      <Form onSubmit={handleAddOrUpdateProduct}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mt-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formImage1" className="mt-2">
          <Form.Label>Image URL 1</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.images[0]}
            onChange={(e) => handleImageChange(0, e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage2" className="mt-2">
          <Form.Label>Image URL 2</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.images[1]}
            onChange={(e) => handleImageChange(1, e.target.value)}
          />
        </Form.Group>

        <div className="d-flex mt-2">
          {newProduct.images.map(
            (img, i) =>
              img && (
                <img
                  key={i}
                  src={img}
                  alt={`img-${i}`}
                  style={{ width: '80px', height: '80px', marginRight: '10px' }}
                />
              )
          )}
        </div>

        <Button type="submit" className="mt-3">
          {editIndex !== null ? 'Update' : 'Add'} Product
        </Button>
      </Form>

      <hr />

      <h4>Product List</h4>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul className="list-group">
          {products.map((prod, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{prod.title}</strong> - Rs {prod.price}
              </div>
              <div>
                <Button variant="primary" size="sm" onClick={() => handleEdit(index)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductManager;
