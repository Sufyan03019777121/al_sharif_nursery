import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CartModal = ({ showCart, setShowCart, cart, removeFromCart, handleCheckout }) => {
  return (
    <Modal show={showCart} onHide={() => setShowCart(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="mb-2 border-bottom pb-2 d-flex justify-content-between align-items-center"
            >
              <div>
                <h6>{item.title}</h6>
                <p>Quantity: {item.quantity || 1}</p>
                <p>Price: Rs {item.price}</p>
              </div>
              <Button variant="danger" onClick={() => removeFromCart(item.productId)}>
                Remove
              </Button>
            </div>
          ))
        )}
      </Modal.Body>
      <Modal.Footer>
        {cart.length > 0 && (
          <Button variant="success me-auto" onClick={handleCheckout}>
            Place Order
          </Button>
        )}
        <Button variant="secondary" onClick={() => setShowCart(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
