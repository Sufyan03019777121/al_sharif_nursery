import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import PhoneNumberModal from './PhoneNumberModal';
import CartModal from './CartModal';
import SearchBar from './SearchBar';
import { FaShoppingCart } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPhone = localStorage.getItem('phoneNumber');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
      setIsPhoneNumberSubmitted(true);
      fetchProducts();
      fetchCart(savedPhone);
    } else {
      setShowModal(true);
    }

    const interval = setInterval(() => {
      axios.get('https://al-sharif-nursery.onrender.com/api/products').catch(() => {});
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://al-sharif-nursery.onrender.com/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async (phone) => {
    try {
      const res = await axios.get(`https://al-sharif-nursery.onrender.com/api/cart/${phone}`);
      setCart(res.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter your phone number to continue.');
      return;
    }

    try {
      await axios.post('https://al-sharif-nursery.onrender.com/api/phoneNumbers', { phoneNumber });
      setIsPhoneNumberSubmitted(true);
      setShowModal(false);
      localStorage.setItem('phoneNumber', phoneNumber);
      alert(`Phone number (${phoneNumber}) saved successfully`);
      fetchProducts();
      fetchCart(phoneNumber);
    } catch (error) {
      console.error('Error saving phone number:', error);
      alert('Failed to save phone number. Please try again.');
    }
  };

  const addToCart = async (product) => {
    if (!phoneNumber) {
      alert('Please enter your phone number to add items to cart.');
      return;
    }

    try {
      await axios.post('https://al-sharif-nursery.onrender.com/api/cart/add', {
        phoneNumber,
        productId: product._id,
      });
      fetchCart(phoneNumber);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const removeFromCart = async (productId) => {
    if (!phoneNumber) {
      alert('Please enter your phone number to remove items from cart.');
      return;
    }

    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/cart/remove/${phoneNumber}/${productId}`);
      fetchCart(phoneNumber);
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart.');
    }
  };

  const handleFilterByTitle = (type) => {
    setSearchTerm('');
    setFilterBy(type);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterBy('');
  };

  const filteredProducts = products.filter((product) => {
    if (filterBy) {
      return product.title.toLowerCase().includes(filterBy.toLowerCase());
    }
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const isInCart = (id) => cart.some((item) => item.productId === id);

  const handleCheckout = () => {
    navigate('/CheckoutPage');
    setShowCart(false);
  };

  return (
    <Container className="mt-4">
      <div className="shadow rounded mb-3 p-3 bg-success bg-opacity-10">
        <h2 className="text-center">AL Sharif Nursery</h2>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          setFilterBy('');
        }}
        isPhoneNumberSubmitted={isPhoneNumberSubmitted}
      />

      <div className="mb-3 d-flex gap-2 flex-wrap">
       
        <Button
          variant="success"
          onClick={() => clearFilters()}
          disabled={!isPhoneNumberSubmitted}
        >
          All Products
        </Button>
        <Button
          variant="success"
          onClick={() => handleFilterByTitle('Outdoor')}
          disabled={!isPhoneNumberSubmitted}
        >
          Outdoor
        </Button>
        <Button
          variant="success"
          onClick={() => handleFilterByTitle('Indoor')}
          disabled={!isPhoneNumberSubmitted}
        >
          Indoor
        </Button>
         <Button
          variant="outline-success"
          onClick={() => setShowCart(true)}
          disabled={!isPhoneNumberSubmitted}
          
        >
          <FaShoppingCart className="mb-1 me-1" />
          Cart ({cart.length})
        </Button>
     
      </div>

      <p>Total Products: {filteredProducts.length}</p>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product._id}>
            <ProductCard
              product={product}
              isInCart={isInCart}
              addToCart={addToCart}
              isPhoneNumberSubmitted={isPhoneNumberSubmitted}
            />
          </Col>
        ))}
      </Row>

      <PhoneNumberModal
        showModal={showModal}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handlePhoneSubmit={handlePhoneSubmit}
      />

      <CartModal
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
      />
    </Container>
  );
};

export default Home;
