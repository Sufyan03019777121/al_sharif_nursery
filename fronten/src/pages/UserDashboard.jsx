import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Alert, Button } from 'react-bootstrap';

const UserDashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userOrders, setUserOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedPhone = localStorage.getItem('phoneNumber');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
      fetchOrders(savedPhone);
      fetchCart(savedPhone);
    } else {
      setError('Please login or provide your phone number first.');
      setLoadingOrders(false);
      setLoadingCart(false);
    }
  }, []);

  const fetchOrders = async (phone) => {
    setLoadingOrders(true);
    try {
      const res = await axios.get(`https://al-sharif-nursery.onrender.com/api/orders`, {
        params: { phone }
      });
      setUserOrders(res.data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders.');
    }
    setLoadingOrders(false);
  };

  const fetchCart = async (phone) => {
    setLoadingCart(true);
    try {
      const res = await axios.get(`https://al-sharif-nursery.onrender.com/api/cart`, {
        params: { phone }
      });
      setCart(res.data.items || []);
      setError('');
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart.');
    }
    setLoadingCart(false);
  };

  const removeFromCart = async (productId) => {
    if (!phoneNumber) {
      alert('Phone number not found.');
      return;
    }
    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/cart/remove/${phoneNumber}/${productId}`);
      fetchCart(phoneNumber);
    } catch (err) {
      console.error('Error removing item from cart:', err);
      alert('Failed to remove item from cart.');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/orders/${orderId}`);
      fetchOrders(phoneNumber);
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>User Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Your Phone Number</Card.Title>
              <Card.Text>{phoneNumber || 'Not Provided'}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <h4>Your Orders</h4>
          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : userOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            userOrders.map((order, idx) => (
              <Card className="mb-3" key={idx}>
                <Card.Body>
                  <Card.Title>
                    Order #{order._id}
                    <Button
                      variant="danger"
                      size="sm"
                      className="float-end"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </Button>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Date: {new Date(order.orderDate).toLocaleDateString()}
                  </Card.Subtitle>
                  <Table size="sm" bordered>
                    <thead>
                      <tr>
                        <th>Plant</th>
                        <th>Qty</th>
                        <th>Price (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td>{item.title}</td>
                          <td>{item.quantity || 1}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="2" className="text-end">
                          <strong>Total:</strong>
                        </td>
                        <td>
                          <strong>Rs {order.totalAmount}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
