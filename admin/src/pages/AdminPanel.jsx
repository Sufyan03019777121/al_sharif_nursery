import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import PhoneNumberForm from './PhoneNumberForm';
import PhoneNumberTable from './PhoneNumberTable';
import EditPhoneNumberModal from './EditPhoneNumberModal';
import AdminUserList from './AdminUserList';  // Importing the new AdminUserList component

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');
  const [showEditPhoneNumberModal, setShowEditPhoneNumberModal] = useState(false);

  useEffect(() => {
    axios.get('https://al-sharif-nursery.onrender.com/api/products').then(res => {
      setProducts(res.data);
    });
    axios.get('https://al-sharif-nursery.onrender.com/api/phoneNumbers').then(res => {
      setPhoneNumbers(res.data);
    });
  }, [warningMessage]);

  return (
    <Container>
      <h1>Admin Panel</h1>
      <Row>
        <Col>
          <Tabs defaultActiveKey="products" id="admin-panel-tabs" className="mb-3">
            <Tab eventKey="products" title="Products">
              <ProductForm />
              <ProductTable products={products} />
            </Tab>
            <Tab eventKey="phoneNumbers" title="Phone Numbers">
              <PhoneNumberForm />
              <PhoneNumberTable phoneNumbers={phoneNumbers} />
            </Tab>
            <Tab eventKey="users" title="Users">
              <AdminUserList />  {/* Including AdminUserList component here */}
            </Tab>
          </Tabs>
        </Col>
      </Row>

      <EditPhoneNumberModal
        show={showEditPhoneNumberModal}
        handleClose={() => setShowEditPhoneNumberModal(false)}
      />
    </Container>
  );
};

export default AdminPanel;
