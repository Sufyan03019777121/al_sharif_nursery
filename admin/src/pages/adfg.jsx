import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert, Container } from 'react-bootstrap';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateData, setUpdateData] = useState({ name: '', address: '' });

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://al-sharif-nursery.onrender.com/api/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Open modal for update
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setUpdateData({ name: order.name, address: order.address });
    setShowModal(true);
  };

  // Handle update form change
  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Submit updated order
  const handleUpdate = async () => {
    try {
      await axios.put(`https://al-sharif-nursery.onrender.com/api/orders/${selectedOrder._id}`, updateData);
      setShowModal(false);
      fetchOrders();
      setError('');
    } catch (err) {
      setError('Failed to update order');
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this order?')) return;

    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/orders/${id}`);
      fetchOrders();
      setError('');
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <Container className="mt-4">
      <h2>Admin Orders</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Total Amount (Rs)</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address}</td>
                <td>{order.totalAmount.toFixed(2)}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(order)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(order._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={updateData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminOrders;
