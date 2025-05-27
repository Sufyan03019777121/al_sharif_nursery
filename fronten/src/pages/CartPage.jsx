import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // <-- یہ لائن شامل کریں

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();  // <-- یہ لائن شامل کریں

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

      await axios.post('https://al-sharif-nursery.onrender.com/api/orders', orderData);
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/cart/clear/${phoneNumber}`);

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

      {/* Checkout Button Added */}
      <Button 
        variant="success" 
        onClick={() => navigate('/CheckoutPage')}
        disabled={cart.length === 0}
      >
        Click here
      </Button>
    </Container>
  );
};

export default CartPage;
