import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Container, Row, Col, Image, Tabs, Tab } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import AdminUserList from './AdminUserList';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', images: ['', ''] });
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn] = useState(true); // Always logged in
  const [showEditModal, setShowEditModal] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumberToEdit, setPhoneNumberToEdit] = useState(null);
  const [additionalData, setAdditionalData] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
      fetchPhoneNumbers();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://al-sharif-nursery.onrender.com/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPhoneNumbers = async () => {
    try {
      const response = await axios.get('https://al-sharif-nursery.onrender.com/api/phoneNumbers');
      setPhoneNumbers(response.data);
      if (response.data.length >= 100) {
        setWarningMessage('Warning: Only 10 more phone numbers can be added.');
      }
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index] = value;
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const handleAddOrUpdateProduct = async () => {
    try {
      if (editProductId) {
        await axios.put(`https://al-sharif-nursery.onrender.com/api/products/${editProductId}`, newProduct);
      } else {
        await axios.post('https://al-sharif-nursery.onrender.com/api/products', newProduct);
      }
      setNewProduct({ title: '', description: '', price: '', images: ['', ''] });
      setEditProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditProductId(product._id);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPhoneNumber = (phoneNumber) => {
    setPhoneNumberToEdit(phoneNumber);
    setAdditionalData(phoneNumber.additionalData || '');
    setShowEditModal(true);
  };

  const handleDeletePhoneNumber = async (id) => {
    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/phoneNumbers/${id}`);
      fetchPhoneNumbers();
    } catch (error) {
      console.error('Error deleting phone number:', error);
    }
  };

  const handleSavePhoneNumber = async () => {
    try {
      await axios.put(`https://al-sharif-nursery.onrender.com/api/phoneNumbers/${phoneNumberToEdit._id}`, {
        phoneNumber: phoneNumberToEdit.phoneNumber,
        additionalData,
      });
      setShowEditModal(false);
      fetchPhoneNumbers();
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPhoneNumber = async () => {
    if (!phoneNumberToEdit?.phoneNumber) return;

    try {
      await axios.post('https://al-sharif-nursery.onrender.com/api/phoneNumbers', {
        phoneNumber: phoneNumberToEdit.phoneNumber,
        additionalData,
      });
      setPhoneNumberToEdit(null);
      setAdditionalData('');
      fetchPhoneNumbers(); // Refresh list
    } catch (error) {
      console.error('Error adding phone number:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center justify-content-between mb-3">
        <Col><h2>Al Sharif Nursery Admin Panel</h2></Col>
      </Row>

      <Tabs defaultActiveKey="products" className="mb-3">
        <Tab eventKey="products" title="Products">
          <Row className="mt-4">
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
                    className='text-truncate h-'
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
                  {editProductId ? 'Update' : 'Add'} Product
                </Button>
              </Form>
            </Col>

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
                      <td 
                      className='text-truncate'
                      style={{maxWidth: '100px'}}
                      >{product.description}</td>
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
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="phoneNumbers"  title="Phone Numbers">
          <Row className="mt-4">
            <Col md={12}>
              <h4>Phone Numbers</h4>
              {warningMessage && <p className="text-danger">{warningMessage}</p>}

              <Form className="mb-4" onSubmit={(e) => {
                e.preventDefault();
                handleAddPhoneNumber();
              }}>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>New Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumberToEdit?.phoneNumber || ''}
                    onChange={(e) =>
                      setPhoneNumberToEdit({
                        ...phoneNumberToEdit,
                        phoneNumber: e.target.value
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formAdditionalData">
                  <Form.Label>Additional Data</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter additional info (optional)"
                    value={additionalData}
                    onChange={(e) => setAdditionalData(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2">
                  Add Phone Number
                </Button>
              </Form>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Phone Number</th>
                    <th>Additional Data</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {phoneNumbers.map((phoneNumber) => (
                    <tr key={phoneNumber._id}>
                      <td>{phoneNumber.phoneNumber}</td>
                      <td>{phoneNumber.additionalData}</td>
                      <td>
                        <Button variant="info p-1 py-0" onClick={() => handleEditPhoneNumber(phoneNumber)}>Edit</Button>{' '}
                        <Button variant="danger p-1 py-0" onClick={() => handleDeletePhoneNumber(phoneNumber._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Edit Modal */}
              <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Phone Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={phoneNumberToEdit?.phoneNumber || ''}
                        onChange={(e) =>
                          setPhoneNumberToEdit({ ...phoneNumberToEdit, phoneNumber: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Additional Data</Form.Label>
                      <Form.Control
                        type="text"
                        value={additionalData}
                        onChange={(e) => setAdditionalData(e.target.value)}
                      />
                    </Form.Group>
                    <Button className="mt-2" onClick={handleSavePhoneNumber}>Save</Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Tab>
          
            
          
      </Tabs>
     
        <AdminUserList/>
      
      
    </Container>
  );
};

export default AdminPanel;
