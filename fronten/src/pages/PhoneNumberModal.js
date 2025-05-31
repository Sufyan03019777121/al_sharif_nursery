import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PhoneNumberModal = ({ showModal, phoneNumber, setPhoneNumber, handlePhoneSubmit }) => {
  return (
    <Modal show={showModal} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Enter Your Phone Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <small className="text-muted">Phone number is required to continue.</small>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePhoneSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PhoneNumberModal;
