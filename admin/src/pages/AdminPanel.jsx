import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table, Image, Tabs, Tab } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

function AdminPanel() {
  // States for managing products, form inputs, and password logic
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', images: ['', ''] });
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to check if the admin is logged in
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState('1234'); // Initial password for the admin panel
  const [loginPassword, setLoginPassword] = useState(''); // Password to access the admin panel
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  // Get all products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle text inputs for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image URL input changes
  const handleImageChange = (index, value) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index] = value;
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  // Add or update product
  const handleAddOrUpdateProduct = async () => {
    try {
      if (editProductId) {
        await axios.put(`http://localhost:5000/api/products/${editProductId}`, newProduct);
      } else {
        await axios.post('http://localhost:5000/api/products', newProduct);
      }
      setNewProduct({ title: '', description: '', price: '', images: ['', ''] });
      setEditProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Load product data into form for editing
  const handleEdit = (product) => {
    setNewProduct(product);
    setEditProductId(product._id);
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Change password logic
  const handleChangePassword = () => {
    if (currentPassword === storedPassword) {
      setStoredPassword(newPassword);
      setPasswordChangeMessage('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setPasswordChangeMessage('Current password is incorrect');
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle login with password
  const handleLogin = () => {
    if (loginPassword === storedPassword) {
      setIsLoggedIn(true);
      setLoginPassword('');
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  return (
    <Container className="mt-4">
      {!isLoggedIn ? (
        // Login Form
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>Admin Panel Login</h2>
            <Form>
              <Form.Group controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </Form.Group>
              {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
              <Button className="mt-3" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      ) : (
        // Admin Panel
        <>
          <h2>DarzNursery Admin Panel</h2>
          <Tabs defaultActiveKey="products" className="mb-3">

            {/* Products Tab */}
            <Tab eventKey="products" title="Products">
              <Row className="mt-4">
                {/* Form Column */}
                <Col md={4}>
                  <h4>{editProductId ? 'Edit' : 'Add'} Product</h4>
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
                        type="text"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    {/* Image URL Inputs */}
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

                    {/* Preview Images */}
                    {newProduct.images.map((img, index) => (
                      img && (
                        <div key={index} className="mt-2">
                          <img src={img} alt={`Preview ${index}`} style={{ width: '100px', height: '100px' }} />
                        </div>
                      )
                    ))}

                    <Button className="mt-3" onClick={handleAddOrUpdateProduct}>
                      {editProductId ? 'Update' : 'Add'} Product
                    </Button>
                  </Form>
                </Col>

                {/* Product Table Column */}
                <Col md={8}>
                  <h4>Product List</h4>
                  <Form.Control
                    type="text"
                    placeholder="Search by title..."
                    className="mb-3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <p>Total Products: {filteredProducts.length}</p>
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
                          <td className='text-truncate' style={{ maxWidth: '10px' }}>{product.description}</td>
                          <td>{product.price}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(product)} className="me-2">
                              <FaEdit />
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Tab>

            {/* Orders Tab */}
            <Tab eventKey="orders" title="Orders">
              <p>No orders yet.</p>
            </Tab>

            {/* Users Tab */}
            <Tab eventKey="users" title="Users">
              <h4>Change Admin Password</h4>
              <Form>
                <Form.Group>
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
                <Button className="mt-2" onClick={handleChangePassword}>Change Password</Button>
              </Form>
              {passwordChangeMessage && <p>{passwordChangeMessage}</p>}
            </Tab>
          </Tabs>
        </>
      )}
    </Container>
  );
}

export default AdminPanel;
