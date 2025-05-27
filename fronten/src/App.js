import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import './App.css';
import LoginRegister from './pages/LoginRegister';
import Contact from './pages/Contact';
import CheckoutPage from './pages/CheckoutPage';
import UserDashboard from './pages/UserDashboard';
import ProductList from './pages/ProductList';
import CartPage from './pages/CartPage';
import AboutUs from './pages/AboutUs';
import DetailPage from './pages/DetailPage';


function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/checkoutpage" element={<CheckoutPage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
