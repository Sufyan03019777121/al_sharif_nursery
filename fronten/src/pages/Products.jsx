import { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');

  const addProduct = () => {
    setProducts([...products, { id: Date.now(), name }]);
    setName('');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Products</h2>
      <Form className="d-flex gap-2 mb-3">
        <Form.Control
          placeholder="Enter product name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button onClick={addProduct}>Add</Button>
      </Form>
      <Table striped bordered hover>
        <thead><tr><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td><Button variant="danger" onClick={() => deleteProduct(p.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Products;
