import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/AdminPanel';
import ProductsTab from './pages/ProductsTab';
import OrdersTab from './pages/OrdersTab';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/ordersTab" element={<OrdersTab />} />
        <Route path="/ProductsTab" element={<ProductsTab />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
