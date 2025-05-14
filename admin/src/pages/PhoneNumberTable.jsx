import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PhoneNumberTable = ({ phoneNumbers, handleEditPhoneNumber, handleDeletePhoneNumber }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Phone Number</th>
          <th>Additional Data</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {phoneNumbers.map((phoneNumber) => (
          <tr key={phoneNumber._id}>
            <td>{phoneNumber.phoneNumber}</td>
            <td>{phoneNumber.additionalData}</td>
            <td>
              <Button variant="info p-1 py-0" onClick={() => handleEditPhoneNumber(phoneNumber)}>Edit</Button>{' '}
              <Button variant="danger p-1 py-0" onClick={() => handleDeletePhoneNumber(phoneNumber._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PhoneNumberTable;
