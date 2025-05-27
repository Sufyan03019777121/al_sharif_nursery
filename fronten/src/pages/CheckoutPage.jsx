import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedPhone = localStorage.getItem('phoneNumber');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
      fetchCart(savedPhone);
    }
  }, []);

  const fetchCart = async (phone) => {
    try {
      const res = await axios.get(`https://al-sharif-nursery.onrender.com/api/cart/${phone}`);
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
      setCart([]);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!name.trim() || !address.trim()) {
      setError('Please fill in your name and address.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    try {
      const orderData = {
        phoneNumber,
        name,
        address,
        items: cart,
        totalAmount,
        orderDate: new Date().toISOString(),
      };

      // API call to place order
      await axios.post('https://al-sharif-nursery.onrender.com/api/orders', orderData);

      // Clear cart from server
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/cart/clear/${phoneNumber}`);

      // Clear local state & localStorage after successful order
      setOrderPlaced(true);
      setError('');
      setCart([]);
      setName('');
      setAddress('');
      setPhoneNumber('');
      localStorage.removeItem('phoneNumber');

    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <Container className="mt-5 text-center">
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully.</p>
        <Button href="/">Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Checkout</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <h5>Your Cart</h5>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plant</th>
              <th>Quantity</th>
              <th>Price (Rs)</th>
              <th>Subtotal (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={i}>
                <td>{item.title}</td>
                <td>{item.quantity || 1}</td>
                <td>{item.price}</td>
                <td>{(item.price * (item.quantity || 1)).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end"><strong>Total</strong></td>
              <td><strong>Rs {totalAmount.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </Table>
      )}

      <Form onSubmit={handlePlaceOrder}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            readOnly
          />
          <Form.Text className="text-muted">
            Phone number cannot be changed here. Go back to Home to update.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formAddress">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" disabled={cart.length === 0}>
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
