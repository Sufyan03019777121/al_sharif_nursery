import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditPhoneNumberModal = ({ show, handleClose, phoneNumberToEdit, setPhoneNumberToEdit, additionalData, setAdditionalData, handleSavePhoneNumber }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Phone Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumberToEdit?.phoneNumber || ''}
              onChange={(e) =>
                setPhoneNumberToEdit({ ...phoneNumberToEdit, phoneNumber: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Additional Data</Form.Label>
            <Form.Control
              type="text"
              value={additionalData}
              onChange={(e) => setAdditionalData(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" onClick={handleSavePhoneNumber}>Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPhoneNumberModal;
