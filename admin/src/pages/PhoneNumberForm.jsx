import React from 'react';
import { Form, Button } from 'react-bootstrap';

const PhoneNumberForm = ({ phoneNumberToEdit, setPhoneNumberToEdit, additionalData, setAdditionalData, handleAddPhoneNumber }) => {
  return (
    <Form className="mb-4" onSubmit={(e) => {
      e.preventDefault();
      handleAddPhoneNumber();
    }}>
      <Form.Group controlId="formPhoneNumber">
        <Form.Label>New Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          value={phoneNumberToEdit?.phoneNumber || ''}
          onChange={(e) =>
            setPhoneNumberToEdit({
              ...phoneNumberToEdit,
              phoneNumber: e.target.value
            })
          }
        />
      </Form.Group>

      <Form.Group controlId="formAdditionalData">
        <Form.Label>Additional Data</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter additional info (optional)"
          value={additionalData}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-2">
        Add Phone Number
      </Button>
    </Form>
  );
};

export default PhoneNumberForm;
