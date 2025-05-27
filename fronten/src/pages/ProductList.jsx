import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      // Ping the server to keep it active
      axios.get('https://al-sharif-nursery.onrender.com/api/products')
        .then(response => console.log('Ping sent to keep the server alive'))
        .catch(error => console.error('Error pinging server:', error));
    }, 14 * 60 * 1000); // Ping every 14 minutes

    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000); // Show after 10 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://al-sharif-nursery.onrender.com/api/products');
      console.log(res.data); // کنسول لاگ ڈال کر چیک کریں
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber) {
      alert('Phone number is required');
      return;
    }

    try {
      await axios.post('https://al-sharif-nursery.onrender.com/api/phoneNumbers', { phoneNumber });
      setIsPhoneNumberSubmitted(true);
      setShowModal(false);
      alert('Phone number saved successfully');
    } catch (error) {
      console.error('Error saving phone number:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
     

      <Form.Control
        type="text"
        placeholder="Search Plants..."
        className="mb-4 shadow border-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p>Total Products: {filteredProducts.length}</p>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product._id}>
            <Card className="h-100">
              <div style={{ display: 'flex', gap: '5px', padding: '5px' }}>
                {product.images?.slice(0, 2).map((img, index) => (
                  <Card.Img
                    key={index}
                    variant="top"
                    src={img}
                    style={{ height: '150px', width: '49%', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className='text-truncate'>{product.description}</Card.Text>
                <Card.Text>
                  <strong>Rs {product.price}</strong> {' '}
                  <span style={{
                    color: 'red', 
                    textDecoration: 'line-through', 
                    fontSize: '1.2rem'
                  }}>
                    Rs {product.price * 2}
                  </span>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    href={`https://wa.me/923059425997?text=I'm interested in ${product.title}`}
                    target="_blank"
                  >
                    <FaWhatsapp className='mb-1' />
                  </Button>
                  <Button variant="primary" href="tel:03059425997">
                    <FaPhone />
                  </Button>
                  <Button as={Link} to={`/product/${product._id}`} variant="info">
                    Detail
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for phone number */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePhoneSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;
